import { useEffect, useState } from "react";
import type { Bill } from "./components/BillRow";
import BillRow from "./components/BillRow";
import { Button } from "react-bootstrap";

export default function Bills() {
  const billsFromStorage = JSON.parse(
    localStorage.getItem("bills") || "[]",
  ) as Array<Bill>;
  const [bills, setBills] = useState(billsFromStorage);

  const updateBills = (index: number, bill: Bill | null) => {
    const newBills = [...bills];
    if (bill !== null) {
      newBills.splice(index, 1, bill);
    } else {
      newBills.splice(index, 1);
    }
    localStorage.setItem("bills", JSON.stringify(newBills));
    setBills(newBills);
  };

  const getBills = () => {
    return bills.map((bill, i) => {
      return <BillRow key={i} index={i} updateBills={updateBills} {...bill} />;
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
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
