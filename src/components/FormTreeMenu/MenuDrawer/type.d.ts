export type MenuDrawerProps = {
  onCloseDrawer: () => void;
  visibleDrawer: boolean;
};

export type MenuFormType = {
  name: string;
  path: string;
  lastMenu?: string;
  icon: string;
  status: 0 | 1
}
