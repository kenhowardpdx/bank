import { Bill } from "../bill";

type DateRange = [Date, Date];

interface TestData {
  name: string;
  startDate: string;
  endDate?: string;
  amount: string;
  range: DateRange;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expected: any;
}

describe("Bill", () => {
  describe("#dueDate", () => {
    test.each([
      {
        name: "bill one",
        startDate: "10/22/1985",
        amount: "15.25",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: new Date("10/22/1985"),
      },
      {
        name: "bill two",
        startDate: "10/22/1985",
        amount: "15.25",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: new Date("10/22/1985"),
      },
      {
        name: "bill three",
        startDate: "10/22/1985",
        amount: "15.25",
        range: <DateRange>[new Date("1/21/2001"), new Date("1/28/2001")],
        expected: new Date("1/22/2001"),
      },
      {
        name: "bill four",
        startDate: "1985-10-22",
        amount: "15.25",
        range: <DateRange>[new Date("1/21/2001"), new Date("1/28/2001")],
        expected: new Date("1/22/2001"),
      },
    ])(
      "bill ($name) is due on $expected",
      ({
        name,
        startDate,
        amount,
        range: [start, end],
        expected,
      }: TestData) => {
        const b = new Bill({ name, startDate, amount });
        expect(b.dueDate(start, end)).toEqual(expected);
      },
    );
  });
  describe("#inRange", () => {
    test.each([
      {
        name: "start date during",
        startDate: "10/22/1985",
        amount: "1",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: true,
      },
      {
        name: "start date before",
        startDate: "9/22/1985",
        amount: "1",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: true,
      },
      {
        name: "start date after",
        startDate: "11/1/1985",
        amount: "1",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: false,
      },
      {
        name: "start date before, end date after",
        startDate: "9/22/1985",
        endDate: "10/31/1985",
        amount: "1",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: true,
      },
      {
        name: "start date before, end date after",
        startDate: "9/22/1985",
        endDate: "10/31/1985",
        amount: "1",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: true,
      },
      {
        name: "start and end date the same in range",
        startDate: "10/22/1985",
        endDate: "10/22/1985",
        amount: "1",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: true,
      },
      {
        name: "start and end date the same out of range",
        startDate: "11/22/1985",
        endDate: "11/22/1985",
        amount: "1",
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: false,
      },
    ])(
      "bill ($name) is due: $expected",
      ({
        name,
        startDate,
        endDate,
        amount,
        range: [start, end],
        expected,
      }: TestData) => {
        const b = new Bill({ name, startDate, endDate, amount });
        expect(b.inRange(start, end)).toEqual(expected);
      },
    );
  });
});
