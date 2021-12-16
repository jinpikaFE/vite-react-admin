export type ComponType = 'menu' | 'page' | 'component';

export type TProColumns = {
  _id: string;
  type: ComponType;
  name: string;
  authority: string[];
  parentId?: string;
  path?: string;
  icon?: string;
  registerTime?: string;
  children?: TProColumns[];
  isLink: 0 | 1; // 是否外链
};

export type TParams = {};
