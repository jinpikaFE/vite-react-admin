import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Layout, Button, message, Modal, Row, Col, Typography, Card } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { COMPONENT_Library, ComponentType, FormElement } from '../types';
import { DraggableItem } from './DraggableItem';
import { SortableElement } from './SortableElement';
import { ConfigPanel } from './ConfigPanel';

import { FormRenderer } from './FormRenderer';

const { Content, Sider } = Layout;

export const FormBuilderContainer: React.FC = () => {
  const [elements, setElements] = useState<FormElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<any>(null); // For Overlay
  const [previewVisible, setPreviewVisible] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8,
        }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragItem(active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    // 1. Handle Drag from Source
    if (active.data.current?.isSource) {
      const type = active.data.current.type as ComponentType;
      const newItem: FormElement = {
        id: uuidv4(),
        type,
        label: active.data.current.label,
        name: `${type.toLowerCase()}_${Date.now()}`,
        props: { placeholder: `请输入${active.data.current.label}` },
      };

      setElements((prev) => {
        // If dropped over a specific item, insert after it? Or just append?
        // Simple strategy: Append to end if dropped on container, 
        // or insert if dropped over an item (requires complex index calculation).
        // For simplicity: Always append or insert at index if possible.
        
        // Let's implement index insertion
        const overId = over.id;
        if (overId === 'CANVAS_DROPPABLE') {
            return [...prev, newItem];
        } else {
             const overIndex = prev.findIndex((item) => item.id === overId);
             if (overIndex >= 0) {
                 const newElements = [...prev];
                 newElements.splice(overIndex + 1, 0, newItem);
                 return newElements;
             }
             return [...prev, newItem];
        }
      });
      setSelectedId(newItem.id);
      return;
    }

    // 2. Handle Reordering
    if (active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id: string) => {
    setElements((prev) => prev.filter((item) => item.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleUpdate = (id: string, updates: Partial<FormElement>) => {
    setElements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleExport = () => {
      Modal.info({
          title: 'Form JSON Schema',
          content: (
              <pre style={{ maxHeight: 400, overflow: 'auto' }}>
                  {JSON.stringify(elements, null, 2)}
              </pre>
          ),
          width: 600
      })
  }

  const selectedElement = elements.find((e) => e.id === selectedId) || null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Layout style={{ height: 'calc(100vh - 120px)', background: '#fff' }}>
        {/* Left Sidebar: Component Library */}
        <Sider width={250} theme="light" style={{ borderRight: '1px solid #f0f0f0', padding: 16 }}>
          <Typography.Title level={5}>组件库</Typography.Title>
          <div className="space-y-2">
            {COMPONENT_Library.map((comp) => (
              <DraggableItem key={comp.type} type={comp.type} label={comp.label} />
            ))}
          </div>
        </Sider>

        {/* Center: Canvas */}
        <Content style={{ padding: 24, background: '#fafafa', overflowY: 'auto' }}>
            <div className="flex justify-between items-center mb-4">
                 <Typography.Title level={4} style={{margin: 0}}>画布</Typography.Title>
                 <div className="space-x-2">
                    <Button onClick={() => setPreviewVisible(true)}>预览</Button>
                    <Button type="primary" onClick={handleExport}>生成 JSON</Button>
                 </div>
            </div>
          
          <div
            className="min-h-[500px] bg-white p-6 shadow-sm rounded-lg border border-gray-200"
            // We can make the whole canvas a droppable zone if needed, 
            // but SortableContext items also act as droppables.
            // We add a wrapper ID for empty state drops.
          >
             <SortableContext
                items={elements.map(e => e.id)}
                strategy={verticalListSortingStrategy}
              >
                 {elements.length === 0 && (
                     <div className="h-32 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded">
                         从左侧拖拽组件到此处
                     </div>
                 )}
                {elements.map((element) => (
                  <SortableElement
                    key={element.id}
                    element={element}
                    isSelected={selectedId === element.id}
                    onSelect={setSelectedId}
                    onDelete={handleDelete}
                  />
                ))}
                {/* Invisible Droppable for empty area drops if needed, 
                    but closestCenter usually handles item proximity well.
                    Let's use a Droppable wrapper if we want explicit empty area support.
                 */}
                 {/* For now, relying on closestCenter and item drops. 
                     If list is empty, we need a target. 
                  */}
                  {elements.length === 0 && (
                       <DroppablePlaceholder id="CANVAS_DROPPABLE" />
                  )}
              </SortableContext>
          </div>
        </Content>

        {/* Right Sidebar: Config */}
        <Sider width={300} theme="light" style={{ borderLeft: '1px solid #f0f0f0' }}>
          <ConfigPanel selectedElement={selectedElement} onUpdate={handleUpdate} />
        </Sider>
      </Layout>

      <DragOverlay>
        {activeDragItem ? (
          <Card
            size="small"
            style={{ width: 200, cursor: 'grabbing', opacity: 0.8 }}
          >
             {/* If it's from source, use label directly. If from canvas, look up label? 
                 Actually active.data.current should have label if we pass it.
              */}
            <Typography.Text>
                {activeDragItem.label || (activeDragItem.type ? COMPONENT_Library.find(c => c.type === activeDragItem.type)?.label : 'Component')}
            </Typography.Text>
          </Card>
        ) : null}
      </DragOverlay>

      <Modal
        title="表单预览"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={800}
      >
        <FormRenderer schema={elements} />
      </Modal>
    </DndContext>
  );
};

// Helper for empty state drop
import { useDroppable } from '@dnd-kit/core';
const DroppablePlaceholder = ({ id }: { id: string }) => {
    const { setNodeRef } = useDroppable({ id });
    return <div ref={setNodeRef} style={{ width: '100%', height: '100px' }} />;
}
