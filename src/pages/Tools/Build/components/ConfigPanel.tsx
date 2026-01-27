import React, { useEffect } from 'react'
import { Form, Input, Switch, Divider, Typography, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FormElement } from '../types'

interface ConfigPanelProps {
  selectedElement: FormElement | null
  onUpdate: (id: string, updates: Partial<FormElement>) => void
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ selectedElement, onUpdate }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (selectedElement) {
      form.setFieldsValue({
        label: selectedElement.label,
        name: selectedElement.name,
        required: selectedElement.required,
        placeholder: selectedElement.props?.placeholder,
        options: selectedElement?.options || []
      })
    }
  }, [selectedElement, form])

  if (!selectedElement) {
    return <div className="p-4 text-gray-400 text-center">请选择一个组件以编辑属性</div>
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
        placeholder: allValues.placeholder
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
        <Form.Item label="占位符 (Placeholder)" name="placeholder">
          <Input />
        </Form.Item>
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
      </Form>
    </div>
  )
}
