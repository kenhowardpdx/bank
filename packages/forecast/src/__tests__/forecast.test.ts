import { getForecast } from "../forecast";
interface TestData {
  incomePerCycle: number;
  startingBalance: number;
  startDate: Date;
  endDate: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bills: Array<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expected?: any;
}

describe("forecast", () => {
  test.each([
    {
      incomePerCycle: 159.99,
      startingBalance: 24.98,
      startDate: new Date("10/21/1985"),
      endDate: new Date("10/28/1985"),
      bills: [],
      expected: {
        cycles: 1,
        sum: "$184.97",
      },
    },
    {
      incomePerCycle: 159.99,
      startingBalance: 24.98,
      startDate: new Date("10/21/1985"),
      endDate: new Date("11/28/1985"),
      bills: [],
      expected: {
        cycles: 3,
        sum: "$504.95",
      },
    },
    {
      incomePerCycle: 159.99,
      startingBalance: 24.98,
      startDate: new Date("10/21/1985"),
      endDate: new Date("11/28/1985"),
      bills: [
        {
          name: "foo",
          amount: "100",
          startDate: "10/11/1985",
        },
        {
          name: "bar",
          amount: "$19.85",
          startDate: "1/18/1985",
        },
      ],
      expected: {
        cycles: 3,
        sum: "$385.10",
      },
    },
    {
      incomePerCycle: 159.99,
      startingBalance: 24.98,
      startDate: new Date("10/21/1985"),
      endDate: new Date("11/28/1985"),
      bills: [
        {
          name: "foo",
          amount: "100",
          startDate: "10/11/1985",
        },
        {
          name: "bar",
          amount: "$2719.85",
          startDate: "1/18/1985",
        },
      ],
      expected: {
        cycles: 3,
        sum: "-$2,314.90",
      },
    },
  ])(
    "sum calculates",
    ({
      incomePerCycle,
      startingBalance,
      startDate,
      endDate,
      bills,
      expected,
    }: TestData) => {
      // do stuff
      const forecast = getForecast(
        incomePerCycle,
        startingBalance,
        startDate,
        endDate,
        bills,
      );
      expect(forecast.sum).toEqual(expected.sum);
      expect(forecast.cycles.length).toEqual(expected.cycles);
    },
  );
});
