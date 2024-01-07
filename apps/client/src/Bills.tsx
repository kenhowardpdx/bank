import { useEffect, useState } from "react";
import type { Bill } from "./components/BillRow";
import BillRow from "./components/BillRow";
import { Button } from "react-bootstrap";
import localforage from "./helpers/storage";

export default function Bills({ storageKey }: { storageKey: string }) {
  const [bills, setBills] = useState<Array<Bill>>([]);

  useEffect(() => {
    (async (key: string) => {
      return await localforage.getItem<Array<Bill>>(`${key}_bills`);
    })(storageKey)
      .then((bills) => {
        if (!bills) {
          return;
        }
        setBills(bills);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const updateBills = (index: number, bill: Bill | null) => {
    const newBills = [...bills];
    if (bill !== null) {
      newBills.splice(index, 1, bill);
    } else {
      newBills.splice(index, 1);
    }

    // localStorage.setItem("bills", JSON.stringify(newBills));
    localforage
      .setItem(`${storageKey}_bills`, newBills)
      .then((bills) => {
        // eslint-disable-next-line no-console
        console.log("successfully stored bills", bills);
      })
      .catch((err) => {
        throw err;
      });
    setBills(newBills);
  };

  const getBills = () => {
    return bills.map((bill, i) => {
      return (
        <BillRow key={i} index={i} updateBills={updateBills} bill={bill} />
      );
    });
  };

  let rows = getBills();

  useEffect(() => {
    rows = getBills();
  }, [bills]);

  const addBill = () => {
    setBills([
      ...bills,
      {
        name: "new",
        startDate: new Date().toLocaleDateString(),
        amount: "0",
        type: "monthly",
      },
    ]);
  };

  return (
    <div>
      <Button variant="primary" onClick={addBill}>
        <i className="bi bi-file-earmark-plus-fill"></i>
      </Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
