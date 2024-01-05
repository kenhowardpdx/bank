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
  describe("bi-weekly", () => {
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
        const forecast = getForecast(
          incomePerCycle,
          startingBalance,
          startDate,
          endDate,
          bills,
          "bi-weekly",
        );
        expect(forecast.sum).toEqual(expected.sum);
        expect(forecast.cycles.length).toEqual(expected.cycles);
      },
    );
  });

  describe("monthly", () => {
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
        endDate: new Date("1/21/1986"),
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
        endDate: new Date("1/28/1986"),
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
          sum: "$145.40",
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
          cycles: 1,
          sum: "-$2,634.88",
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
        const forecast = getForecast(
          incomePerCycle,
          startingBalance,
          startDate,
          endDate,
          bills,
          "monthly",
        );
        expect(forecast.sum).toEqual(expected.sum);
        expect(forecast.cycles.length).toEqual(expected.cycles);
      },
    );
  });

  describe("10|25", () => {
    test.each([
      {
        incomePerCycle: 159.99,
        startingBalance: 24.98,
        startDate: new Date("10/21/1985"),
        endDate: new Date("12/28/1985"),
        bills: [],
        expected: {
          cycles: 5,
          sum: "$824.93",
        },
      },
      {
        incomePerCycle: 159.99,
        startingBalance: 24.98,
        startDate: new Date("10/21/1985"),
        endDate: new Date("1/21/1986"),
        bills: [],
        expected: {
          cycles: 6,
          sum: "$984.92",
        },
      },
      {
        incomePerCycle: 159.99,
        startingBalance: 24.98,
        startDate: new Date("10/21/1985"),
        endDate: new Date("1/28/1986"),
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
          cycles: 7,
          sum: "$785.36",
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
        const forecast = getForecast(
          incomePerCycle,
          startingBalance,
          startDate,
          endDate,
          bills,
          "10|25",
        );
        expect(forecast.sum).toEqual(expected.sum);
        expect(forecast.cycles.length).toEqual(expected.cycles);
      },
    );
  });
});
