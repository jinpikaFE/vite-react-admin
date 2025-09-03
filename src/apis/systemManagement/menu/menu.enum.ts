export enum MenuTypeEnum {
  MENU = 'C',
  DIRECTORY = 'M',
  BUTTON = 'F'
}

export const MenuTypeEnumMap = {
  [MenuTypeEnum.MENU]: {
    label: '菜单',
    value: MenuTypeEnum.MENU,
    color: 'green'
  },
  [MenuTypeEnum.DIRECTORY]: {
    label: '目录',
    value: MenuTypeEnum.DIRECTORY,
    color: 'blue'
  },
  [MenuTypeEnum.BUTTON]: {
    label: '按钮',
    value: MenuTypeEnum.BUTTON,
    color: 'orange'
  }
}

