import { Amount } from "./amount";
import { Bill, BillInput } from "./bill";
import { Cycle } from "./cycle";
import { sum } from "./sum";

type CycleType = "weekly" | "bi-weekly" | "monthly" | "10|25";

interface CalculatedCycle {
  startDate: Date;
  endDate: Date;
  sum: string;
  total: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bills: Array<any>;
}

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
  let cycles: Array<CalculatedCycle> = [];
  let next = new Date(
    startDate.getUTCFullYear(),
    startDate.getUTCMonth(),
    startDate.getUTCDate(),
    0,
  );
  let end = new Date(
    startDate.getUTCFullYear(),
    startDate.getUTCMonth(),
    startDate.getUTCDate(),
    0,
  );
  while (end < endDate) {
    const start = next;
    if (cycleType === "weekly") {
      throw new Error("NOT IMPLEMENTED");
    }
    if (cycleType === "bi-weekly") {
      next = new Date(
        next.getUTCFullYear(),
        next.getUTCMonth(),
        next.getUTCDate() + 14,
        0,
      );
      end = new Date(
        next.getUTCFullYear(),
        next.getUTCMonth(),
        next.getUTCDate() - 1,
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
    const calculated = {
      startDate: cycle.startDate,
      endDate: cycle.endDate,
      sum: cycle.sum,
      total: new Amount(total.toString()).toString(),
      bills: cycle.bills,
    };
    cycles = [...cycles, calculated];
  }
  return {
    cycles,
    sum: new Amount(total.toString()).toString(),
    startingBalance: new Amount(startingBalance.toString()).toString(),
  };
};

export { getForecast };
