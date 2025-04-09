import React, { useState, useContext } from 'react';
import { WalletContext } from '../context/WalletContext';
import DeploymentStatus from '../components/DeploymentStatus';
import axios from 'axios';

export default function Deploy() {
  const [deploymentOption, setDeploymentOption] = useState('ipfs');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState(null);
  const { wallet, connection } = useContext(WalletContext);

  const handleDeploy = async () => {
    if (!wallet || !connection) return;
    
    setIsDeploying(true);
    try {
      const websiteData = localStorage.getItem('builderState') || {};
      
      const endpoint = deploymentOption === 'ipfs' 
        ? '/api/deploy/ipfs' 
        : '/api/deploy/vercel';
      
      const response = await axios.post(endpoint, {
        websiteData,
        walletAddress: wallet
      });

      setDeploymentResult({
        success: true,
        url: response.data.url,
        transactionId: response.data.transactionId
      });
    } catch (error) {
      console.error('Deployment error:', error);
      setDeploymentResult({
        success: false,
        error: error.response?.data?.error || 'Deployment failed'
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-accent">Deploy Your Website</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Deployment Options</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="ipfs"
              name="deployment"
              value="ipfs"
              checked={deploymentOption === 'ipfs'}
              onChange={() => setDeploymentOption('ipfs')}
              className="h-5 w-5 text-accent"
            />
            <label htmlFor="ipfs" className="flex-1">
              <div className="font-medium">IPFS (Decentralized)</div>
              <p className="text-sm text-gray-400">
                Host your site on the InterPlanetary File System for permanent, decentralized storage.
                Cost: 0.1 SOL
              </p>
            </label>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="vercel"
              name="deployment"
              value="vercel"
              checked={deploymentOption === 'vercel'}
              onChange={() => setDeploymentOption('vercel')}
              className="h-5 w-5 text-accent"
            />
            <label htmlFor="vercel" className="flex-1">
              <div className="font-medium">Vercel (Traditional Hosting)</div>
              <p className="text-sm text-gray-400">
                Fast, reliable traditional hosting with automatic SSL.
                Cost: Free
              </p>
            </label>
          </div>
        </div>
      </div>

      {!wallet ? (
        <div className="text-center py-8">
          <p className="text-xl mb-4">Connect your wallet to deploy</p>
          <button className="bg-accent px-6 py-3 rounded-lg hover:bg-opacity-90">
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="bg-accent px-8 py-3 rounded-lg hover:bg-opacity-90 text-lg font-medium"
          >
            {isDeploying ? 'Deploying...' : 'Deploy Now'}
          </button>
        </div>
      )}

      {deploymentResult && (
        <DeploymentStatus 
          status={deploymentResult.success ? 'success' : 'error'}
          url={deploymentResult.url}
          transactionId={deploymentResult.transactionId}
        />
      )}
    </div>
  );
}