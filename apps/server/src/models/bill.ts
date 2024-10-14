import db from "@app/database/index.js";

type BillModel = {
  id: number;
  name: string;
  start_date: Date;
  end_date?: Date;
  amount: string;
  bill_frequency: string;
};

export class Bill {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date | null;
  amount: string;
  frequency: string;

  constructor(
    id: number,
    name: string,
    startDate: Date,
    endDate: Date | null,
    amount: string,
    frequency: string,
  ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.frequency = frequency;
  }
}

export const getBillsByUserId = async (userId: number): Promise<Bill[]> => {
  const results = await db.query<BillModel>(
    `SELECT
      id,
      name,
      start_date,
      end_date,
      amount::numeric,
      bill_frequency
      FROM bills WHERE user_id = $1
      ORDER BY start_date ASC,
        name ASC
      `,
    [userId],
  );
  return results.rows.map(
    (row: BillModel) =>
      new Bill(
        row.id,
        row.name,
        row.start_date,
        row.end_date || null,
        row.amount,
        row.bill_frequency,
      ),
  );
};
