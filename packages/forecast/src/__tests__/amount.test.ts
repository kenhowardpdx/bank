import { Amount } from "../amount";

interface TestData {
  input: string;
  float: number;
  formatted: string;
}
describe("Amount", () => {
  test.each([
    {
      input: "15.00",
      float: 15,
      formatted: "$15.00",
    },
    {
      input: "$5.15",
      float: 5.15,
      formatted: "$5.15",
    },
    {
      input: "$2,025.15",
      float: 2025.15,
      formatted: "$2,025.15",
    },
  ])(
    "amount ($input) as float > $float; formatted: $formatted",
    ({ input, float, formatted }: TestData) => {
      const a = new Amount(input);
      expect(a.amount).toEqual(float);
      expect(a.toString()).toEqual(formatted);
    },
  );
});
