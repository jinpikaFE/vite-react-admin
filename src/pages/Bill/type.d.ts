export type FormBillType = {
  _id: string;
  date: Date;
  exRecords: IExRecord[];
  totalConsume: number;
};

export interface IExRecord {
  type: string;
  value: number;
}
