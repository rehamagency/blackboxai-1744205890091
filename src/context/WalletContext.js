import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletProvider as SolanaWalletProvider, useWallet } from '@solana/wallet-adapter-react';

export const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [connection, setConnection] = useState(null);
  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  // Initialize connection
  useEffect(() => {
    const conn = new Connection(clusterApiUrl(network), 'confirmed');
    setConnection(conn);
  }, [network]);

  // Supported wallets
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new LedgerWalletAdapter(),
    new TorusWalletAdapter()
  ];

  // Get wallet balance
  const getBalance = useCallback(async (publicKey) => {
    if (!connection || !publicKey) return;
    try {
      const balance = await connection.getBalance(new PublicKey(publicKey));
      setBalance(balance / 10**9); // Convert lamports to SOL
    } catch (err) {
      setError('Failed to fetch balance');
      console.error(err);
    }
  }, [connection]);

  // Handle wallet events
  const handleWalletEvents = useCallback(() => {
    return {
      connect: (publicKey) => {
        setWallet(publicKey.toString());
        setIsConnected(true);
        getBalance(publicKey);
      },
      disconnect: () => {
        setWallet(null);
        setIsConnected(false);
        setBalance(0);
      },
      error: (err) => {
        setError(err.message);
      }
    };
  }, [getBalance]);

  return (
    <SolanaWalletProvider 
      wallets={wallets} 
      autoConnect
      onConnect={handleWalletEvents().connect}
      onDisconnect={handleWalletEvents().disconnect}
      onError={handleWalletEvents().error}
    >
      <WalletContext.Provider 
        value={{ 
          wallet, 
          setWallet,
          connection,
          network,
          balance,
          isConnected,
          error,
          getBalance,
          setNetwork
        }}
      >
        {children}
      </WalletContext.Provider>
    </SolanaWalletProvider>
  );
}
