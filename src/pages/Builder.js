import React, { useState, useContext } from 'react';
import { WalletContext } from '../context/WalletContext';
import BuilderCanvas from '../components/BuilderCanvas';
import ComponentPanel from '../components/ComponentPanel';
import TemplatePicker from '../components/TemplatePicker';

export default function Builder() {
  const { wallet } = useContext(WalletContext);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [components, setComponents] = useState([]);

  return (
    <div className="flex h-screen bg-primary">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4 text-accent">Components</h2>
        <ComponentPanel onAddComponent={(comp) => 
          setComponents([...components, comp])} 
        />
        
        <TemplatePicker 
          onSelectTemplate={setSelectedTemplate} 
          selected={selectedTemplate}
        />
      </div>

      {/* Main Builder Area */}
      <div className="flex-1 p-4">
        {!wallet ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl mb-4">Connect Wallet to Start Building</h2>
              <button className="bg-accent px-4 py-2 rounded">
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <BuilderCanvas 
            components={components} 
            template={selectedTemplate}
          />
        )}
      </div>
    </div>
  );
}