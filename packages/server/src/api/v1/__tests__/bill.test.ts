import { Bill } from "../bill";

interface TestData {
  name: string;
  startDate: string;
  amount: string;
  expectedDueDate: Date;
}

describe("Bill", () => {
  test.each([
    {
      name: "bill one",
      startDate: "10/22/1985",
      amount: "15.25",
      expectedDueDate: new Date("10/22/1985"),
    },
  ])(
    "bill ($name) is due on $expectedDueDate",
    ({ name, startDate, amount, expectedDueDate }: TestData) => {
      const b = new Bill({ name, startDate, amount });
      expect(b.dueDate(new Date("10/21/1985"), new Date("10/28/1985"))).toEqual(
        expectedDueDate,
      );
    },
  );
});
