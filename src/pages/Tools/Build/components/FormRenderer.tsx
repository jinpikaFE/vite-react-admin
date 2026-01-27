import React from 'react';
import { Form, Input, Select, Checkbox, Radio, DatePicker, Switch, Button } from 'antd';
import { FormElement } from '../types';

interface FormRendererProps {
  schema: FormElement[];
  onSubmit?: (values: any) => void;
}

const ComponentMap: Record<string, React.FC<any>> = {
  Input: Input,
  TextArea: Input.TextArea,
  Select: Select,
  Checkbox: Checkbox.Group,
  Radio: Radio.Group,
  DatePicker: DatePicker,
  Switch: Switch,
};

export const FormRenderer: React.FC<FormRendererProps> = ({ schema, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
    onSubmit?.(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
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
      
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
