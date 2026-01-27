import React from 'react';
import { Form, Input, Select, Checkbox, Radio, DatePicker, Switch, Button, InputNumber } from 'antd';
import { FormElement, FormConfig } from '../types';

interface FormRendererProps {
  schema: FormElement[];
  config?: FormConfig;
  onSubmit?: (values: any) => void;
}

const ComponentMap: Record<string, React.FC<any>> = {
  Input: Input,
  TextArea: Input.TextArea,
  Select: Select,
  Checkbox: Checkbox.Group,
  Radio: Radio.Group,
  DatePicker: DatePicker,
  RangePicker: DatePicker.RangePicker,
  Switch: Switch,
  InputNumber: InputNumber,
};

export const FormRenderer: React.FC<FormRendererProps> = ({ schema, config, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
    onSubmit?.(values);
  };

  const formLayout = config?.layout || 'vertical';
  const labelCol = config?.layout === 'horizontal' ? config.labelCol : undefined;
  const wrapperCol = config?.layout === 'horizontal' ? config.wrapperCol : undefined;

  return (
    <Form 
        form={form} 
        layout={formLayout} 
        labelAlign={config?.labelAlign}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onFinish={onFinish}
    >
      {schema.map((element) => {
        const Component = ComponentMap[element.type] || Input;
        return (
          <Form.Item
            key={element.id}
            label={element.label}
            name={element.name}
            required={element.required}
            rules={[{ required: element.required, message: `请输入${element.label}` }]}
          >
            <Component {...element.props} options={element.options} />
          </Form.Item>
        );
      })}
      
      <Form.Item wrapperCol={config?.layout === 'horizontal' ? { offset: config.labelCol.span, span: config.wrapperCol.span } : undefined}>
        <Button type="primary" htmlType="submit" block>
          {config?.submitText || '提交'}
        </Button>
      </Form.Item>
    </Form>
  );
};
