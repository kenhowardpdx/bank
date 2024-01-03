type BillType = "monthly" | "annually";
export interface Bill {
    name: string;
    startDate: string;
    endDate?: string;
    amount: string;
    type: BillType;
}
export default function BillRow({ index, bill, updateBills, }: {
    index: number;
    bill: Bill;
    updateBills: (index: number, bill: Bill | null) => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
