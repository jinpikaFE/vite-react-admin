export type ComponentType =
  | 'Input'
  | 'TextArea'
  | 'Select'
  | 'Checkbox'
  | 'Radio'
  | 'DatePicker'
  | 'Switch';

export interface FormElement {
  id: string;
  type: ComponentType;
  label: string;
  name: string;
  required?: boolean;
  props?: Record<string, any>;
  options?: { label: string; value: string | number }[]; // For Select, Radio, Checkbox
}

export const COMPONENT_Library: { type: ComponentType; label: string; icon?: string }[] = [
  { type: 'Input', label: '单行文本' },
  { type: 'TextArea', label: '多行文本' },
  { type: 'Select', label: '下拉选择' },
  { type: 'Checkbox', label: '复选框' },
  { type: 'Radio', label: '单选框' },
  { type: 'DatePicker', label: '日期选择' },
  { type: 'Switch', label: '开关' },
];
