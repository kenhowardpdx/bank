import { Amount } from "./amount";

interface BillInput {
  startDate: string;
  endDate?: string;
  amount: string;
  name: string;
  type: "monthly" | "annually";
}

const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);
};

const normalizeDate = (d: string) => {
  const rawDate = new Date(d);
  const newDate = new Date(
    rawDate.getUTCFullYear(),
    rawDate.getUTCMonth(),
    rawDate.getUTCDate(),
  );
  return newDate;
};

class Bill {
  #amount: Amount;
  name: string;
  startDate: Date;
  endDate?: Date;
  type: "monthly" | "annually";
  constructor({ startDate, endDate, amount, name, type }: BillInput) {
    this.startDate = normalizeDate(startDate);
    this.endDate = endDate ? normalizeDate(endDate) : undefined;
    this.name = name;
    this.type = type;

    this.#amount = new Amount(amount, true);
  }
  inRange = (start: Date, end: Date): boolean => {
    const dueDate = this.dueDate(start, end);

    if (this.endDate && this.endDate < start) {
      return false;
    }

    if (this.startDate > end) {
      return false;
    }

    if (start <= dueDate && dueDate <= end) {
      return true;
    }

    return false;
  };
  dueDate = (start: Date, end: Date): Date => {
    // account for shorter months by restricting due date to month length
    const lastDayOfStartMonth = getLastDayOfMonth(start).getUTCDate();
    // account for going into the next year
    const lastDayOfEndMonth = getLastDayOfMonth(end).getUTCDate();
    let day =
      this.startDate.getUTCDate() <= lastDayOfStartMonth
        ? this.startDate.getUTCDate()
        : lastDayOfStartMonth;
    if (this.type === "annually") {
      return new Date(
        start.getUTCFullYear(),
        this.startDate.getUTCMonth(),
        this.startDate.getUTCDate(),
        0,
      );
    }
    if (start.getUTCDate() <= day) {
      return new Date(start.getUTCFullYear(), start.getUTCMonth(), day);
    }
    if (start.getUTCDate() > this.startDate.getUTCDate()) {
      day =
        this.startDate.getUTCDate() <= lastDayOfEndMonth
          ? this.startDate.getUTCDate()
          : lastDayOfEndMonth;
      return new Date(end.getUTCFullYear(), end.getUTCMonth(), day);
    }
    // default to today
    return new Date();
  };
  getAmount = (): Amount => {
    return this.#amount;
  };
}

export { Bill, BillInput };
