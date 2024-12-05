export function convertMoneyToFloat(money: string): number {
  if (money[0] === "$") {
    return parseFloat(money.substring(1));
  }
  throw new Error("missing '$' at index 0");
}
