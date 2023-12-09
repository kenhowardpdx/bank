import { Amount } from "./amount";

interface BillInput {
  startDate: string;
  endDate?: string;
  amount: string;
  name: string;
}

const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 0);
};

class Bill {
  amount: Amount;
  name: string;
  startDate: Date;
  endDate?: Date;
  constructor({ startDate, endDate, amount, name }: BillInput) {
    this.startDate = new Date(startDate);
    this.endDate = endDate ? new Date(endDate) : undefined;
    this.name = name;

    this.amount = new Amount(amount);
  }
  public inCycle = (start: Date, end: Date): boolean => {
    // do stuff
    const dueDate = this.dueDate(start, end);

    if (this.endDate && this.endDate < start) {
      return false;
    }

    if (start <= dueDate && dueDate <= end) {
      return true;
    }

    return false;
  };

  public dueDate = (start: Date, end: Date): Date => {
    // account for shorter months by restricting due date to month length
    const lastDayOfStartMonth = getLastDayOfMonth(start).getDate();
    // account for going into the next year
    const lastDayOfEndMonth = getLastDayOfMonth(end).getDate();
    let day =
      this.startDate.getDate() <= lastDayOfStartMonth
        ? this.startDate.getDate()
        : lastDayOfStartMonth;
    if (start.getDate() <= day) {
      return new Date(start.getFullYear(), start.getMonth(), day);
    }
    if (start.getDate() > this.startDate.getDate()) {
      day =
        this.startDate.getDate() <= lastDayOfEndMonth
          ? this.startDate.getDate()
          : lastDayOfEndMonth;
      return new Date(end.getFullYear(), end.getMonth(), day);
    }
    // default to today
    return new Date();
  };
}

export { Bill };
