export type ResultType<T = any> = {
  success?: boolean;
  data: T;
  message: string;
  code: number;
  total?: number;
};
