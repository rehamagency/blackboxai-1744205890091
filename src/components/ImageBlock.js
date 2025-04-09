import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export default function ImageBlock({ src, width, position }) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { type: 'image', props: { src: imageSrc, width } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className={`absolute ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        left: position?.x || 0,
        top: position?.y || 0,
        cursor: 'move'
      }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />
      ) : (
        <img 
          src={imageSrc} 
          alt="Uploaded content" 
          style={{ width: `${width}px` }}
          className="rounded-lg shadow-md"
        />
      )}
    </div>
  );
}