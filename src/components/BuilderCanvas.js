import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import ComponentRenderer from './ComponentRenderer';

export default function BuilderCanvas({ components, template }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      return { x: offset?.x || 0, y: offset?.y || 0 };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`relative w-full h-full border-2 rounded-lg ${isOver ? 'border-accent' : 'border-gray-600'}`}
      style={{
        backgroundImage: template ? `url(${template.background})` : 'none',
        backgroundSize: 'cover'
      }}
    >
      {components.map((component, index) => (
        <ComponentRenderer 
          key={index} 
          component={component} 
        />
      ))}
    </div>
  );
}