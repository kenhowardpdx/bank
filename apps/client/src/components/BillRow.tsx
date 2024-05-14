import { useEffect, useState } from "react";
import { formatDate, normalizeDate } from "../helpers/date";
import { Button } from "react-bootstrap";

type BillType = "monthly" | "annually";
export interface Bill {
  name: string;
  startDate: string;
  endDate?: string;
  amount: string;
  type: BillType;
}

export default function BillRow({
  index,
  bill,
  updateBills,
}: {
  index: number;
  bill: Bill;
  updateBills: (index: number, bill: Bill | null) => void;
}) {
  const [billName, setBillName] = useState(bill.name);
  const [billStartDate, setBillStartDate] = useState(bill.startDate);
  const [billEndDate, setBillEndDate] = useState(bill.endDate);
  const [billAmount, setBillAmount] = useState(bill.amount);
  const [billType, setBillType] = useState(bill.type);
  const setBills = () => {
    updateBills(index, {
      name: billName,
      startDate: billStartDate,
      endDate: billEndDate,
      amount: billAmount,
      type: billType,
    });
  };
  useEffect(() => {
    setBills();
  }, [billName, billStartDate, billEndDate, billAmount, billType]);
  const deleteBill = () => {
    updateBills(index, null);
  };
  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            className="form-control"
            value={billName}
            onChange={(e) => {
              setBillName(e.target.value);
            }}
            autoFocus={true}
          />
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            value={formatDate(new Date(billStartDate))}
            onChange={(e) => {
              setBillStartDate(normalizeDate(new Date(e.target.value)));
            }}
          />
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            value={billEndDate ? formatDate(new Date(billEndDate)) : ""}
            onChange={(e) => {
              setBillEndDate(normalizeDate(new Date(e.target.value)));
            }}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={billAmount}
            onChange={(e) => {
              setBillAmount(e.target.value);
            }}
          />
        </td>
        <td>
          <select
            className="form-control"
            value={billType}
            onChange={(e) => {
              setBillType(e.target.value as BillType);
            }}
          >
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </td>
        <td>
          <div className="col gy-4 text-end">
            <Button variant="danger" onClick={deleteBill}>
              <i className="bi bi-trash-fill"></i>
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}
