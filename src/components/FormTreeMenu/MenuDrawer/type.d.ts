import { ProFormInstance } from "@ant-design/pro-form";
import { ActionType } from "@ant-design/pro-table";

export type MenuDrawerProps = {
  onCloseDrawer: () => void;
  visibleDrawer: boolean;
  refTable: ActionType | undefined
  item: (MenuFormType & {_id: string}) | undefined
};

export type MenuFormType = {
  name: string;
  path: string;
  lastMenu?: string;
  icon: string;
  status: 0 | 1
}
