import { Amount } from "./amount";
import { Bill, BillInput } from "./bill";
import { Cycle } from "./cycle";
import { sum } from "./sum";

type CycleType = "weekly" | "bi-weekly" | "monthly" | "10|25";

const getForecast = (
  incomePerCycle: number,
  startingBalance: number,
  startDate: Date,
  endDate = startDate,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawBills: Array<any>,
  cycleType: CycleType = "bi-weekly",
) => {
  const bills = rawBills.map((b: BillInput) => new Bill(b));
  let total = startingBalance;
  let cycles: Array<Cycle> = [];
  let next = startDate;
  let end = new Date(startDate);
  while (end < endDate) {
    const start = next;
    if (cycleType === "weekly") {
      throw new Error("NOT IMPLEMENTED");
    }
    if (cycleType === "bi-weekly") {
      next = new Date(
        next.getFullYear(),
        next.getMonth(),
        next.getDate() + 14,
        0,
      );
      end = new Date(
        next.getFullYear(),
        next.getMonth(),
        next.getDate() - 1,
        0,
      );
    }
    if (cycleType === "monthly") {
      throw new Error("NOT IMPLEMENTED");
    }
    if (cycleType === "10|25") {
      throw new Error("NOT IMPLEMENTED");
    }
    // TODO: use overrides to allow user to modify income per date or range.
    const income = incomePerCycle;
    const cycle = new Cycle(bills, start, end);
    total = sum(sum(total, income), cycle.getSum());
    cycles = [...cycles, cycle];
  }
  return {
    cycles,
    sum: new Amount(total.toString()).toString(),
    startingBalance: new Amount(startingBalance.toString()).toString(),
  };
};

export { getForecast };
