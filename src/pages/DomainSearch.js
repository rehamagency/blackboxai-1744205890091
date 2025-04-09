import React, { useState, useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

export default function DomainSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { wallet } = useContext(WalletContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      // In a real implementation, this would call the Namecheap API
      // For now, we'll mock the response
      const mockResults = [
        { domain: `${query}.crypto`, available: true, price: 5 },
        { domain: `${query}.sol`, available: true, price: 2 },
        { domain: `${query}.com`, available: false }
      ];
      setResults(mockResults);
    } catch (error) {
      console.error('Domain search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (domain) => {
    if (!wallet) return;
    
    // In a real implementation, this would initiate a Solana payment
    alert(`Purchasing ${domain} would initiate a payment flow in a real implementation`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-accent">Domain Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a domain..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-4 py-2 focus:border-accent focus:ring-1 focus:ring-accent"
          />
          <button 
            type="submit" 
            className="bg-accent px-6 py-2 rounded hover:bg-opacity-90"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <div className="grid gap-4">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-lg font-medium">{result.domain}</span>
                  {result.available && (
                    <span className="ml-2 text-green-400">Available</span>
                  )}
                  {!result.available && (
                    <span className="ml-2 text-red-400">Unavailable</span>
                  )}
                </div>
                {result.available ? (
                  <button
                    onClick={() => handlePurchase(result.domain)}
                    className="bg-accent px-4 py-2 rounded hover:bg-opacity-90"
                    disabled={!wallet}
                  >
                    {wallet ? `Purchase for $${result.price}` : 'Connect Wallet'}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}