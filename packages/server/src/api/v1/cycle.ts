import { Bill } from "./bill";

const copyBill = (bill: Bill): Bill => {
  return new Bill({
    startDate: bill.startDate.toLocaleDateString("en-US"),
    endDate: bill.endDate
      ? bill.endDate.toLocaleDateString("en-US")
      : undefined,
    amount: bill.amount.toString(),
    name: bill.name,
  });
};

class Cycle {
  public bills: Array<Bill>;
  private _startDate: Date;
  private _endDate: Date;
  constructor(bills: Array<Bill>, start: Date, end: Date) {
    this._startDate = start;
    this._endDate = end;
    this.bills = this._gen_cycle(bills, start, end);
  }
  private _gen_cycle = (
    bills: Array<Bill>,
    start: Date,
    end: Date,
  ): Array<Bill> => {
    const newBills = bills.map((bill) => copyBill(bill));
    const filteredBills = newBills.filter((x) => x.inRange(start, end));
    return filteredBills.sort((x, y) => {
      if (x.dueDate(start, end) < y.dueDate(start, end)) {
        return -1;
      }
      return 1;
    });
  };
}

export { Cycle };
