import { useEffect, useState } from "react";
import type { Bill } from "./components/BillRow";
import BillRow from "./components/BillRow";
import { Button } from "react-bootstrap";
import localforage from "./helpers/storage";
import { sort } from "./helpers/sort";

export default function Bills({ storageKey }: { storageKey: string }) {
  const [bills, setBills] = useState<Array<Bill>>([]);

  const sortBills = (bills: Bill[]) => {
    const sortedBills = sort(bills, "name", "startDate");
    return sortedBills;
  };

  useEffect(() => {
    (async (key: string) => {
      return await localforage.getItem<Array<Bill>>(`${key}_bills`);
    })(storageKey)
      .then((bills) => {
        if (!bills) {
          return;
        }
        setBills(sortBills(bills) as unknown as Bill[]);
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

    localforage
      .setItem(`${storageKey}_bills`, newBills)
      .then((bills) => {
        // eslint-disable-next-line no-console
        console.log("successfully stored bills", bills);

        setBills(bills);
      })
      .catch((err) => {
        throw err;
      });
  };

  const getBills = () => {
    return bills.map((bill, i) => {
      return (
        <BillRow
          key={i}
          index={i}
          updateBills={updateBills}
          bill={bill as unknown as Bill}
        />
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
        name: "",
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
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
