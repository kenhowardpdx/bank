/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getForecast } from "@bank/forecast";
import type { CycleType } from "@bank/forecast/dist/forecast";
import { useState } from "react";
import { formatDate, getFutureDate } from "./helpers/date";
import type { Bill } from "./components/BillRow";

export default function Forecast() {
  // TODO: allow option to persist incomePerCycle
  const [incomePerCycle, setIncomePerCycle] = useState("0");
  const [startingBalance, setStartingBalance] = useState("0");
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
  const [endDate, setEndDate] = useState(
    getFutureDate(new Date(startDate), 14).toLocaleDateString(),
  );
  const [cycleType, setCycleType] = useState<CycleType>("bi-weekly");
  const bills = JSON.parse(
    localStorage.getItem("bills") || "[]",
  ) as Array<Bill>;
  const forecast = getForecast(
    parseFloat(incomePerCycle),
    parseFloat(startingBalance),
    new Date(startDate),
    new Date(endDate),
    bills,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    cycleType,
  );

  const Bill = function ({
    isShown,
    dueDate,
    name,
    amount,
  }: {
    isShown: boolean;
    dueDate: string;
    name: string;
    amount: string;
  }) {
    return (
      <tr className={"collapse" + (isShown ? "show" : "")}>
        <td>{dueDate}</td>
        <td>{name}</td>
        <td>{amount}</td>
      </tr>
    );
  };

  const Row = function ({
    total,
    startDate,
    endDate,
    bills,
  }: {
    total: string;
    startDate: Date;
    endDate: Date;
    bills: Array<Bill & { dueDate: Date }>;
  }) {
    const isNegative = total[0] === "-";
    const [isShown, setIsShown] = useState(false);
    const rows = bills.map((bill, i) => {
      return (
        <Bill
          key={i}
          isShown={isShown}
          dueDate={bill.dueDate.toLocaleDateString() || "none"}
          name={bill.name}
          amount={bill.amount}
        />
      );
    });
    return (
      <>
        <tr
          className={"clickable" + (isNegative ? "negative" : "")}
          onClick={() => setIsShown(!isShown)}
        >
          <td colSpan={2}>
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </td>
          <td>{total}</td>
        </tr>
        {rows}
      </>
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const rows: Array<any> = forecast.cycles.map((cycle, i) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return (
      <Row
        key={i}
        total={cycle.total}
        startDate={cycle.startDate}
        endDate={cycle.endDate}
        bills={cycle.bills}
      />
    );
  });
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return (
    <>
      <form>
        <div className="row">
          <div className="col">
            <label className="form-label">Income per cycle</label>
            <input
              type="number"
              className="form-control"
              value={incomePerCycle}
              onChange={(event) => setIncomePerCycle(event.target.value)}
            />
          </div>
          <div className="col">
            <label className="form-label">Balance</label>
            <input
              type="number"
              className="form-control"
              value={startingBalance}
              onChange={(event) => setStartingBalance(event.target.value)}
            />
          </div>
          <div className="col">
            <label className="form-label">Start date</label>
            <input
              type="date"
              className="form-control"
              value={formatDate(new Date(startDate))}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div className="col">
            <label className="form-label">End date</label>
            <input
              type="date"
              className="form-control"
              value={formatDate(new Date(endDate))}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
          <div className="col">
            <label className="form-label">Cycle type</label>
            <select
              className="form-select"
              value={cycleType}
              onChange={(event) =>
                setCycleType(event.target.value as CycleType)
              }
            >
              <option value="bi-weekly">Bi-weekly</option>
              <option value="10|25">10th & 25th</option>
            </select>
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th colSpan={2}>Pay period</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}
