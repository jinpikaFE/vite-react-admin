import React, { useEffect } from 'react'
import { Form, Input, Switch, Divider, Typography, Button, Space, Radio, InputNumber, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FormElement, FormConfig } from '../types'

interface ConfigPanelProps {
  selectedElement: FormElement | null
  formConfig: FormConfig
  onUpdate: (id: string, updates: Partial<FormElement>) => void
  onConfigUpdate: (updates: Partial<FormConfig>) => void
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ selectedElement, formConfig, onUpdate, onConfigUpdate }) => {
  const [form] = Form.useForm()
  const [configForm] = Form.useForm()

  useEffect(() => {
    if (selectedElement) {
      form.setFieldsValue({
        label: selectedElement.label,
        name: selectedElement.name,
        required: selectedElement.required,
        placeholder: selectedElement.props?.placeholder,
        placeholderStart: selectedElement.props?.placeholderStart,
        placeholderEnd: selectedElement.props?.placeholderEnd,
        options: selectedElement?.options || [],
        // DatePicker specific props
        format: selectedElement.props?.format,
        picker: selectedElement.props?.picker || 'date',
        showTime: selectedElement.props?.showTime,
      })
    }
  }, [selectedElement, form])

  // Sync global config to form
  useEffect(() => {
    configForm.setFieldsValue({
      layout: formConfig.layout,
      labelAlign: formConfig.labelAlign,
      'labelCol.span': formConfig.labelCol.span,
      'wrapperCol.span': formConfig.wrapperCol.span,
      submitText: formConfig.submitText
    })
  }, [formConfig, configForm])

  const handleConfigChange = (_: any, allValues: any) => {
    onConfigUpdate({
      layout: allValues.layout,
      labelAlign: allValues.labelAlign,
      labelCol: { span: allValues['labelCol.span'] },
      wrapperCol: { span: allValues['wrapperCol.span'] },
      submitText: allValues.submitText
    })
  }

  if (!selectedElement) {
    return (
      <div className="p-4 h-full overflow-y-auto">
        <Typography.Title level={5}>全局配置</Typography.Title>
        <Divider className="my-3" />
        <Form
            form={configForm}
            layout="vertical"
            onValuesChange={handleConfigChange}
        >
             <Form.Item label="表单布局" name="layout">
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="horizontal">水平</Radio.Button>
                    <Radio.Button value="vertical">垂直</Radio.Button>
                    <Radio.Button value="inline">行内</Radio.Button>
                </Radio.Group>
             </Form.Item>
             <Form.Item label="标签对齐" name="labelAlign">
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="left">左对齐</Radio.Button>
                    <Radio.Button value="right">右对齐</Radio.Button>
                </Radio.Group>
             </Form.Item>
             <Form.Item label="标签宽度 (Label Span)" name="labelCol.span">
                 <InputNumber min={0} max={24} style={{ width: '100%' }} />
             </Form.Item>
             <Form.Item label="内容宽度 (Wrapper Span)" name="wrapperCol.span">
                 <InputNumber min={0} max={24} style={{ width: '100%' }} />
             </Form.Item>
             <Form.Item label="提交按钮文案" name="submitText">
                 <Input />
             </Form.Item>
        </Form>
      </div>
    )
  }

  const handleValuesChange = (_: any, allValues: any) => {
    if (!selectedElement || !allValues) return

    console.log(allValues, 'allValues')

    onUpdate(selectedElement.id, {
      label: allValues.label,
      name: allValues.name,
      required: allValues.required,
      props: {
        ...selectedElement.props,
        placeholder: allValues.placeholder,
        placeholderStart: allValues.placeholderStart,
        placeholderEnd: allValues.placeholderEnd,
        format: allValues.format,
        picker: allValues.picker,
        showTime: allValues.showTime,
      },
      // Ensure options is always an array of valid objects
      // Filter out undefined items that might be created by Form.List add() before input
      options: (allValues.options || []).filter((opt: any) => opt),
    })
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <Typography.Title level={5}>属性配置</Typography.Title>
      <Divider className="my-3" />
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        key={selectedElement.id} // Re-mount when ID changes
      >
        <Form.Item label="字段标识 (Name)" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="标题 (Label)" name="label">
          <Input />
        </Form.Item>
        {selectedElement.type === 'RangePicker' ? (
             <>
                <Form.Item label="开始占位符" name="placeholderStart">
                   <Input placeholder="开始日期" />
                </Form.Item>
                <Form.Item label="结束占位符" name="placeholderEnd">
                   <Input placeholder="结束日期" />
                </Form.Item>
             </>
        ) : (
             <Form.Item label="占位符 (Placeholder)" name="placeholder">
               <Input />
             </Form.Item>
        )}
        <Form.Item label="是否必填" name="required" valuePropName="checked">
          <Switch />
        </Form.Item>

        {['Select', 'Radio', 'Checkbox'].includes(selectedElement.type) && (
          <>
            <Divider orientation="left" plain>
              选项配置
            </Divider>
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'label']}
                        rules={[{ required: true, message: 'Missing label' }]}
                        noStyle
                      >
                        <Input placeholder="Label" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true, message: 'Missing value' }]}
                        noStyle
                      >
                        <Input placeholder="Value" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add({ label: `选项${fields.length + 1}`, value: `option_${fields.length + 1}` })}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加选项
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}

        {['DatePicker', 'RangePicker'].includes(selectedElement.type) && (
          <>
            <Divider orientation="left" plain>
              日期配置
            </Divider>
            <Form.Item label="日期格式 (Format)" name="format" tooltip="YYYY-MM-DD HH:mm:ss">
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item label="选择器类型 (Picker)" name="picker">
               <Select>
                  <Select.Option value="date">日期 (Date)</Select.Option>
                  <Select.Option value="week">周 (Week)</Select.Option>
                  <Select.Option value="month">月 (Month)</Select.Option>
                  <Select.Option value="quarter">季度 (Quarter)</Select.Option>
                  <Select.Option value="year">年 (Year)</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item label="显示时间" name="showTime" valuePropName="checked">
              <Switch />
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  )
}
