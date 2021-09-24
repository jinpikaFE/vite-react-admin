import { ResultStatusType } from "antd/lib/result";

export type NotFoundPropsType = {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
  extra?: React.ReactDOM
}