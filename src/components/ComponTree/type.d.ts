import type {
  TParams,
  TProColumns,
} from '@/pages/authManage/ComponManage/type';
import type {
  ActionType,
  ProColumns,
  ProTableProps,
} from '@ant-design/pro-table';
import type { ProFormProps } from '@ant-design/pro-form';
import type { DrawerForm } from '../RightDrawer/type';
import { MutableRefObject } from 'react';

export type ComponProps = {
  columns: ProColumns[];
  formRef: any;
  cItem: TProColumns;
  setCItem: (cItem: TProColumns | undefined) => void;
  refTable: MutableRefObject<ActionType | undefined>;
  drawerTitle?: string; // 抽屉标题
  newBtnTitle?: string;
  proTableProps: ProTableProps<TProColumns, TParams>; // proTable的属性
  FromProps?: ProFormProps; // DrawerForm的属性
} & DrawerForm;
