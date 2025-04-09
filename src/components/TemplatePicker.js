import React from 'react';

const templates = [
  {
    id: 'doge-vibes',
    name: 'Doge Vibes',
    description: 'Fun and playful Doge-themed template',
    thumbnail: 'https://i.imgur.com/5QzY5jA.jpg',
    background: 'https://i.imgur.com/5QzY5jA.jpg',
    accentColor: '#FFD700'
  },
  {
    id: 'shiba-space',
    name: 'Shiba Space',
    description: 'Space-themed with Shiba Inu elements',
    thumbnail: 'https://i.imgur.com/8XZQZ9j.jpg',
    background: 'https://i.imgur.com/8XZQZ9j.jpg',
    accentColor: '#FF5555'
  },
  {
    id: 'pepe-classic',
    name: 'Pepe Classic',
    description: 'Classic Pepe the Frog meme style',
    thumbnail: 'https://i.imgur.com/9QZQZ9j.jpg',
    background: 'https://i.imgur.com/9QZQZ9j.jpg',
    accentColor: '#00AA00'
  }
];

export default function TemplatePicker({ onSelectTemplate, selected }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-accent">Templates</h3>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`cursor-pointer border-2 rounded overflow-hidden transition-all ${selected?.id === template.id ? 'border-accent' : 'border-transparent hover:border-gray-500'}`}
          >
            <img 
              src={template.thumbnail} 
              alt={template.name}
              className="w-full h-20 object-cover"
            />
            <div className="p-1 bg-gray-700">
              <p className="text-xs font-medium truncate">{template.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}