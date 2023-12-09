type USD = `$$${number}.${number}`;

class Amount {
  static format = (amount: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(amount) as USD;
  };
  private _amount: number;
  constructor(amount: string) {
    const amt = parseFloat(amount.replace("$", ""));
    this._amount = amt;
  }
  public get amount() {
    return this._amount;
  }
  public toString() {
    return Amount.format(this._amount);
  }
}

export { Amount };
