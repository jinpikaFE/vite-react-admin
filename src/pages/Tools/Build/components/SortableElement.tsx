import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FormElement, FormConfig } from '../types'
import { Form, Input, Select, Checkbox, Radio, DatePicker, Switch, Button, Card } from 'antd'
import { DeleteOutlined, DragOutlined } from '@ant-design/icons'

interface SortableElementProps {
  element: FormElement
  config?: FormConfig
  isSelected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

const ComponentMap: Record<string, React.FC<any>> = {
  Input: Input,
  TextArea: Input.TextArea,
  Select: Select,
  Checkbox: Checkbox.Group,
  Radio: Radio.Group,
  DatePicker: DatePicker,
  RangePicker: DatePicker.RangePicker,
  Switch: Switch
}

export const SortableElement: React.FC<SortableElementProps> = ({
  element,
  config,
  isSelected,
  onSelect,
  onDelete
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
    data: {
      type: element.type,
      label: element.label,
      isSortable: true
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isSelected ? '2px solid #1890ff' : '1px solid transparent',
    marginBottom: 8,
    position: 'relative' as const
  }

  const Component = ComponentMap[element.type] || Input
  const labelCol = config?.layout === 'horizontal' ? config.labelCol : undefined;
  const wrapperCol = config?.layout === 'horizontal' ? config.wrapperCol : undefined;

  // Handle placeholders
  let placeholder = element.props?.placeholder;
  if (element.type === 'RangePicker') {
      placeholder = [element.props?.placeholderStart || '开始日期', element.props?.placeholderEnd || '结束日期'];
  } else if (!placeholder) {
      placeholder = `请输入${element.label}`;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={e => {
        e.stopPropagation()
        onSelect(element.id)
      }}
      className="group"
    >
      <Card
        size="small"
        className="relative hover:border-blue-300 border border-dashed border-gray-200 transition-colors"
      >
        <Form
            layout={config?.layout || 'vertical'}
            labelAlign={config?.labelAlign || 'right'}
            component={false}
        >
            <Form.Item
              label={element.label}
              // name={element.name} // Removed to prevent FormContext warning in builder
              required={element.required}
              labelCol={labelCol}
              wrapperCol={wrapperCol}
              className="mb-0 pointer-events-none" // Disable interaction in preview
              style={{ marginBottom: 0 }}
            >
              <Component {...element.props} options={element.options || []} placeholder={placeholder} />
            </Form.Item>
        </Form>

        {/* Action Buttons */}
        <div className="absolute top-0 right-0 p-1 flex gap-1 bg-gray-100 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            type="text"
            size="small"
            icon={<DragOutlined />}
            style={{ cursor: 'move' }}
            {...attributes}
            {...listeners}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={e => {
              e.stopPropagation()
              onDelete(element.id)
            }}
          />
        </div>
      </Card>
    </div>
  )
}
