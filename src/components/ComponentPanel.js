import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { FaFont, FaImage, FaMousePointer, FaCoins } from 'react-icons/fa';

const ComponentButton = ({ type, icon, label, onAdd }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onAdd({
          type,
          props: getDefaultProps(type),
          position: { x: dropResult.x, y: dropResult.y }
        });
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getDefaultProps = (type) => {
    switch(type) {
      case 'text':
        return { content: 'New Text', fontSize: 16, color: '#FFFFFF' };
      case 'image':
        return { src: 'https://via.placeholder.com/150', width: 150 };
      case 'button':
        return { text: 'Click Me', link: '#', color: '#FF5555' };
      case 'tokenInfo':
        return { tokenAddress: '', showPrice: true, showSupply: true };
      default:
        return {};
    }
  };

  return (
    <button
      ref={drag}
      className={`flex items-center gap-2 w-full p-2 mb-2 rounded ${isDragging ? 'opacity-50' : 'hover:bg-gray-700'}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default function ComponentPanel({ onAddComponent }) {
  return (
    <div className="space-y-2">
      <ComponentButton
        type="text"
        icon={<FaFont />}
        label="Text Block"
        onAdd={onAddComponent}
      />
      <ComponentButton
        type="image"
        icon={<FaImage />}
        label="Image"
        onAdd={onAddComponent}
      />
      <ComponentButton
        type="button"
        icon={<FaMousePointer />}
        label="Button"
        onAdd={onAddComponent}
      />
      <ComponentButton
        type="tokenInfo"
        icon={<FaCoins />}
        label="Token Info"
        onAdd={onAddComponent}
      />
    </div>
  );
}