import { Cycle } from "../cycle";
import { Bill } from "../bill";

type DateRange = [Date, Date];

interface TestData {
  bills: Array<Bill>;
  range: DateRange;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expected?: any;
}

describe("Cycle", () => {
  describe("bills", () => {
    test.each([
      {
        bills: [
          new Bill({
            startDate: "10/22/1985",
            amount: "15.25",
            name: "bill one",
            type: "monthly",
          }),
        ],
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: 1,
      },
      {
        bills: [
          new Bill({
            startDate: "10/22/1985",
            amount: "15.25",
            name: "bill one",
            type: "monthly",
          }),
          new Bill({
            startDate: "10/23/1985",
            amount: "15.25",
            name: "bill two",
            type: "monthly",
          }),
        ],
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: 2,
      },
      {
        bills: [
          new Bill({
            startDate: "10/22/1985",
            amount: "15.25",
            name: "bill one",
            type: "monthly",
          }),
          new Bill({
            startDate: "10/22/1985",
            amount: "15.25",
            name: "bill two",
            type: "monthly",
          }),
          new Bill({
            startDate: "10/23/1985",
            amount: "15.25",
            name: "bill three",
            type: "monthly",
          }),
        ],
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: 3,
      },
    ])(
      "has $expected bills",
      ({ bills, range: [start, end], expected }: TestData) => {
        const c = new Cycle(bills, start, end);
        expect(c.bills.length).toEqual(expected);
      },
    );
    test.each([
      {
        bills: [
          new Bill({
            startDate: "10/21/1985",
            amount: "15.25",
            name: "one",
            type: "monthly",
          }),
          new Bill({
            startDate: "10/23/1985",
            amount: "15.25",
            name: "three",
            type: "monthly",
          }),
          new Bill({
            startDate: "10/22/1985",
            amount: "15.25",
            name: "two",
            type: "monthly",
          }),
        ],
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: "one | two | three",
      },
      {
        bills: [
          new Bill({
            startDate: "10/21/1985",
            amount: "15.25",
            name: "one",
            type: "monthly",
          }),
          new Bill({
            startDate: "1/23/1986",
            amount: "15.25",
            name: "not included in cycle",
            type: "monthly",
          }),
          new Bill({
            startDate: "9/23/1985",
            amount: "15.25",
            name: "three",
            type: "monthly",
          }),
          new Bill({
            startDate: "10/22/1985",
            amount: "15.25",
            name: "two",
            type: "monthly",
          }),
          new Bill({
            startDate: "9/22/1985",
            endDate: "9/22/1985",
            amount: "15.25",
            name: "ends before cycle",
            type: "monthly",
          }),
        ],
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: "one | two | three",
      },
    ])(
      "has bills in order by date",
      ({ bills, range: [start, end], expected }: TestData) => {
        const c = new Cycle(bills, start, end);
        expect(c.bills.flatMap((x) => x.name).join(" | ")).toEqual(expected);
      },
    );
  });
  describe("multiple cycles", () => {
    test.each([
      {
        bills: [
          new Bill({
            startDate: "10/22/1985",
            endDate: "10/22/1985",
            amount: "15.25",
            name: "bill one",
            type: "monthly",
          }),
          new Bill({
            startDate: "10/22/1985",
            amount: "15.25",
            name: "bill two",
            type: "monthly",
          }),
          new Bill({
            startDate: "10/23/1985",
            amount: "15.25",
            name: "bill three",
            type: "monthly",
          }),
        ],
        range: <DateRange>[new Date("10/21/1985"), new Date("10/28/1985")],
        expected: -76.25,
      },
    ])(
      "has different bills per cycle",
      ({ bills, range: [start, end], expected }: TestData) => {
        const cOne = new Cycle(bills, start, end);
        const cTwo = new Cycle(
          bills,
          new Date(start.getFullYear(), start.getMonth() + 1, start.getDate()),
          new Date(end.getFullYear(), end.getMonth() + 1, end.getDate()),
        );
        expect(cOne.bills.length).not.toEqual(cTwo.bills.length);
        expect(cOne.bills.length).not.toEqual(cTwo.bills.length);
        expect(cOne.getSum() + cTwo.getSum()).toBe(expected);
      },
    );
  });
});
