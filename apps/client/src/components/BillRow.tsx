import { useState, useEffect } from "react";
import { formatDate } from "../helpers/date";
import { Button } from "react-bootstrap";

export interface Bill {
  name: string;
  startDate: string;
  endDate?: string;
  amount: string;
}

export default function BillRow({
  index,
  updateBills,
  name: n,
  startDate: sd,
  endDate: ed,
  amount: a,
}: Bill & {
  index: number;
  updateBills: (index: number, bill: Bill | null) => void;
}) {
  const [name, setName] = useState(n);
  const [startDate, setStartDate] = useState(sd);
  const [endDate, setEndDate] = useState(ed);
  const [amount, setAmount] = useState(a);
  const setBills = () => {
    updateBills(index, { name, startDate, endDate, amount });
  };
  useEffect(() => {
    setBills();
  }, [name, startDate, endDate, amount]);
  const deleteBill = () => {
    updateBills(index, null);
  };
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{amount}</td>
      </tr>
      <tr>
        <td colSpan={4}>
          <form className="container p-0">
            <div className="row gy-4">
              <div className="col">
                <label className="form-label">Names</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label className="form-label">Start date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formatDate(new Date(startDate))}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label className="form-label">End date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate ? formatDate(new Date(endDate)) : ""}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label className="form-label">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col gy-4 text-end">
                <Button variant="danger" onClick={deleteBill}>
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </div>
            </div>
          </form>
        </td>
      </tr>
    </>
  );
}
