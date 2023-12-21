type USD = `${"-" | ""}$$${number}.${number}`;

class Amount {
  static format = (amount: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(amount) as USD;
  };
  #amount: number;
  constructor(amount: string, negative = false) {
    if (amount[0] === "-") {
      negative = true;
    }
    const amt = parseFloat(amount.replace(/[^0-9.]/g, ""));
    this.#amount = negative ? amt * -1 : amt;
  }
  public get amount() {
    return this.#amount;
  }
  public toString() {
    return Amount.format(this.#amount);
  }
}

export { Amount };
