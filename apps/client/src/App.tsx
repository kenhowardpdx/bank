/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getForecast } from "@bank/forecast";
import { useState } from "react";

export default function Bank() {
  const [incomePerCycle, setIncomePerCycle] = useState("300");
  const [startingBalance, setStartingBalance] = useState("199.99");
  const [startDate, setStartDate] = useState(
    new Date("10/21/1985").toLocaleDateString(),
  );
  const [endDate, setEndDate] = useState(
    new Date("12/31/1985").toLocaleDateString(),
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const forecast = getForecast(
    parseFloat(incomePerCycle),
    parseFloat(startingBalance),
    new Date(startDate),
    new Date(endDate),
    [
      {
        name: "Portland General Electric",
        amount: "100.00",
        startDate: "10/21/1985",
      },
      {
        name: "Netflix",
        amount: "19.99",
        startDate: "11/9/1985",
      },
    ],
  );

  type DateInputFormat = `${number}-${number}-${number}`;

  const formatDate = (d: Date) => {
    return d.toISOString().substring(0, 10) as DateInputFormat;
  };

  const Bill = function ({
    isShown,
    name,
    amount,
  }: {
    isShown: boolean;
    name: string;
    amount: string;
  }) {
    return (
      <tr className={"collapse" + (isShown ? "show" : "")}>
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bills: Array<any>;
  }) {
    const isNegative = total[0] === "-";
    const [isShown, setIsShown] = useState(false);
    const rows = bills.map((bill, i) => {
      return (
        <Bill key={i} isShown={isShown} name={bill.name} amount={bill.amount} />
      );
    });
    return (
      <>
        <tr
          className={"clickable" + (isNegative ? "negative" : "")}
          onClick={() => setIsShown(!isShown)}
        >
          <td>
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
    <div className="container py-4 px-3 mx-auto">
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
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Pay period</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
