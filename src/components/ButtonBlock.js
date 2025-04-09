import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export default function ButtonBlock({ text, link, color, position }) {
  const [buttonText, setButtonText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BUTTON,
    item: { type: 'button', props: { text: buttonText, link, color } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`absolute ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        left: position?.x || 0,
        top: position?.y || 0,
        cursor: 'move'
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2 p-2 bg-gray-800 rounded-lg">
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="bg-gray-700 px-2 py-1 rounded"
          />
          <input
            type="text"
            value={link}
            placeholder="Button link"
            className="bg-gray-700 px-2 py-1 rounded"
          />
          <button 
            className="px-2 py-1 bg-accent rounded"
            onClick={() => setIsEditing(false)}
          >
            Save
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 rounded transition-colors"
          style={{ backgroundColor: color }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}