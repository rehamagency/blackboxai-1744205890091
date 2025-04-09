import React, { useState, useEffect, useContext } from 'react';
import { WalletContext } from '../context/WalletContext';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const DeploymentStatus = ({ status, url, transactionId }) => {
  const { connection } = useContext(WalletContext);
  const [txStatus, setTxStatus] = useState('pending');

  useEffect(() => {
    const checkTransaction = async () => {
      if (transactionId && connection) {
        try {
          const tx = await connection.getTransaction(transactionId);
          setTxStatus(tx ? 'confirmed' : 'pending');
        } catch (error) {
          setTxStatus('failed');
        }
      }
    };

    const interval = setInterval(checkTransaction, 5000);
    return () => clearInterval(interval);
  }, [transactionId, connection]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        {status === 'success' ? (
          <FaCheckCircle className="text-green-500 text-2xl" />
        ) : (
          <FaTimesCircle className="text-red-500 text-2xl" />
        )}
        <h3 className="text-xl font-bold">
          {status === 'success' ? 'Deployment Successful!' : 'Deployment Failed'}
        </h3>
      </div>

      {status === 'success' && (
        <>
          <p className="mb-2">Your site is now live at:</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent underline break-all"
          >
            {url}
          </a>
          
          {transactionId && (
            <div className="mt-4">
              <p className="text-sm flex items-center gap-2">
                Transaction Status: 
                {txStatus === 'pending' && (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Pending</span>
                  </>
                )}
                {txStatus === 'confirmed' && (
                  <>
                    <FaCheckCircle className="text-green-500" />
                    <span>Confirmed</span>
                  </>
                )}
                {txStatus === 'failed' && (
                  <>
                    <FaTimesCircle className="text-red-500" />
                    <span>Failed</span>
                  </>
                )}
              </p>
              <p className="text-xs mt-1">
                TX ID: {transactionId}
              </p>
            </div>
          )}
        </>
      )}

      {status === 'error' && (
        <p className="text-red-400">Error: Failed to deploy website. Please try again.</p>
      )}
    </div>
  );
};

export default DeploymentStatus;