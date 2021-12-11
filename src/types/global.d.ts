export type ResultType<T> = {
  success?: boolean;
  data: T;
  message: string;
  code: number;
};
