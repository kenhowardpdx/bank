import { Amount } from "./amount";
import { Bill } from "./bill";
import { sum } from "./sum";

const sortKeys = <T extends { [key: string]: unknown }>(o: T) => {
  const newObj = { ...o };
  Object.keys(newObj)
    .sort()
    .reduce((obj: { [key: string]: unknown }, key) => {
      obj[key] = newObj[key];
      return obj;
    }, {});
  return newObj;
};

const copyBill = (bill: Bill): Bill => {
  return new Bill({
    startDate: bill.startDate.toLocaleDateString("en-US"),
    endDate: bill.endDate
      ? bill.endDate.toLocaleDateString("en-US")
      : undefined,
    amount: bill.getAmount().toString(),
    name: bill.name,
    type: bill.type,
  });
};

interface BillOut {
  amount: string;
  dueDate: Date;
  name: string;
  startDate: Date;
  endDate?: Date | undefined;
}

class Cycle {
  bills: Array<BillOut>;
  sum: string;
  #sum: Amount;
  startDate: Date;
  endDate: Date;
  constructor(bills: Array<Bill>, start: Date, end: Date) {
    this.startDate = start;
    this.endDate = end;
    const { bills: filteredBills, sum: total } = this.#gen_cycle(
      bills,
      start,
      end,
    );
    this.bills = filteredBills;
    this.#sum = new Amount(total.toString());
    this.sum = this.#sum.toString();
  }
  #gen_cycle = (bills: Array<Bill>, start: Date, end: Date) => {
    const filteredBills = [...bills].filter((x) => x.inRange(start, end));
    filteredBills.sort((x, y) => {
      if (x.dueDate(start, end) === y.dueDate(start, end)) {
        return 0;
      }
      if (x.dueDate(start, end) < y.dueDate(start, end)) {
        return -1;
      }
      return 1;
    });
    let total = 0;
    const out = filteredBills.map((b) => {
      const bill = copyBill(b);
      total = sum(total, bill.getAmount().amount);
      return sortKeys({
        ...bill,
        amount: bill.getAmount().toString(),
        dueDate: bill.dueDate(start, end),
      });
    });
    return {
      bills: out,
      sum: total,
    };
  };
  getSum = () => {
    return this.#sum.amount;
  };
}

export { Cycle };
