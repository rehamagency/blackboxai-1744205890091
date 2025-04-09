import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export default function TextBlock({ content, fontSize, color, position }) {
  const [text, setText] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TEXT,
    item: { type: 'text', props: { content: text, fontSize, color } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`absolute p-2 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        left: position?.x || 0,
        top: position?.y || 0,
        fontSize: `${fontSize}px`,
        color: color,
        cursor: 'move'
      }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setIsEditing(false)}
          className="bg-transparent border-b border-accent outline-none"
          style={{ color: color }}
          autoFocus
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}