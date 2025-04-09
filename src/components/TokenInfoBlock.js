import React, { useState, useEffect, useContext } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { WalletContext } from '../context/WalletContext';

export default function TokenInfoBlock({ tokenAddress, showPrice, showSupply, position }) {
  const [tokenData, setTokenData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { connection } = useContext(WalletContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TOKEN_INFO,
    item: { type: 'tokenInfo', props: { tokenAddress, showPrice, showSupply } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (tokenAddress && connection) {
      // In a real implementation, this would fetch token data from the blockchain
      // For now, we'll mock the data
      const mockTokenData = {
        name: 'MEME Coin',
        symbol: 'MEME',
        price: 0.42,
        supply: 1000000,
        address: tokenAddress
      };
      setTokenData(mockTokenData);
    }
  }, [tokenAddress, connection]);

  return (
    <div
      ref={drag}
      className={`absolute bg-gray-800 p-4 rounded-lg shadow-lg ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        left: position?.x || 0,
        top: position?.y || 0,
        cursor: 'move'
      }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={tokenAddress}
            placeholder="Token contract address"
            className="bg-gray-700 px-2 py-1 rounded"
          />
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={showPrice} 
              id="showPrice"
            />
            <label htmlFor="showPrice">Show Price</label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={showSupply} 
              id="showSupply"
            />
            <label htmlFor="showSupply">Show Supply</label>
          </div>
          <button 
            className="px-2 py-1 bg-accent rounded"
            onClick={() => setIsEditing(false)}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          {tokenData ? (
            <>
              <h3 className="text-lg font-bold">{tokenData.name} ({tokenData.symbol})</h3>
              {showPrice && <p>Price: ${tokenData.price}</p>}
              {showSupply && <p>Total Supply: {tokenData.supply.toLocaleString()}</p>}
              <p className="text-xs text-gray-400 truncate">Contract: {tokenData.address}</p>
            </>
          ) : (
            <p>No token data available</p>
          )}
        </div>
      )}
    </div>
  );
}