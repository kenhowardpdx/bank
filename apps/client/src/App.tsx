/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getForecast } from "@bank/forecast";
import { ReactEventHandler } from "react";

export default function Bank() {
  const incomePerCycle = 300;
  const startingBalance = 199.99;
  const startDate = new Date("10/21/1985");
  const endDate = new Date("12/31/1985");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const forecast = getForecast(
    incomePerCycle,
    startingBalance,
    startDate,
    endDate,
    [
      {
        name: "foo",
        amount: "100.00",
        startDate: "10/21/1985",
      },
      {
        name: "bar",
        amount: "19.99",
        startDate: "11/9/1985",
      },
    ],
  );
  const openSettings: ReactEventHandler<HTMLElement> = (e) => {
    // do a thing
    e.preventDefault();
  };

  const Row = function ({
    total,
    startDate,
    endDate,
  }: {
    total: string;
    startDate: Date;
    endDate: Date;
  }) {
    return (
      <tr>
        <td>
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </td>
        <td>{total}</td>
      </tr>
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
      />
    );
  });
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return (
    <div className="container">
      <button type="button" onClick={openSettings}>
        open settings
      </button>
      <h2>
        Forecast for {startDate.toLocaleDateString()} -{" "}
        {endDate.toLocaleDateString()}
      </h2>
      {forecast.sum}
      <table className="table">
        <thead>
          <tr>
            <th>Range</th>
            <th>idk</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
