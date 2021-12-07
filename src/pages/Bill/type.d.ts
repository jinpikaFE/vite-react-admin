export type FormBillType = {
  _id: string;
  date: string;
  exRecords: IExRecord[];
  totalConsume: number;
};

export interface IExRecord {
  type: string;
  value: number;
}
