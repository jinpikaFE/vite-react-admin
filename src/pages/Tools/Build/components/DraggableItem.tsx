import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card, Typography } from 'antd';
import { ComponentType } from '../types';

interface DraggableItemProps {
  type: ComponentType;
  label: string;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ type, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `SOURCE_${type}`,
    data: {
      type,
      isSource: true,
      label,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: 'move',
      }
    : { cursor: 'move' };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="mb-2">
      <Card size="small" hoverable bodyStyle={{ padding: '8px 12px' }}>
        <Typography.Text>{label}</Typography.Text>
      </Card>
    </div>
  );
};
