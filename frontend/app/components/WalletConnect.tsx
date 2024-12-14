import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

interface WalletConnectProps {
  onConnect: (walletAddress: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [account, setAccount] = useState<string | null>(null);
  const MANTLE_SEPOLIA_RPC_URL = "https://rpc.sepolia.mantle.xyz";

  // Check if MetaMask is available
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  };

  // Check if Okto Wallet is available
  const isOktoWalletInstalled = () => {
    // Check for Okto Wallet provider
    const oktoProvider = window.ethereum && (window as any).Okto;
    
    // Check for Okto Wallet extension
    const oktoExtension = window.ethereum && window.ethereum.isOkto;
  
    return !!oktoProvider || !!oktoExtension;
  };
  
  // Add Mantle Sepolia Network
  const addMantleSepoliaNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x138B", // Chain ID: 5003 in hex
              chainName: "Mantle Sepolia",
              nativeCurrency: {
                name: "Mantle Sepolia ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: [MANTLE_SEPOLIA_RPC_URL],
              blockExplorerUrls: ["https://sepolia-explorer.mantle.xyz"],
            },
          ],
        });
      } catch (error) {
        console.error("Failed to add Mantle Sepolia network:", error);
      }
    }
  };

  const connectWithMetaMask = async () => {
    console.log("Attempting to connect with MetaMask...");
    if (isMetaMaskInstalled()) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum, "any");
        console.log("MetaMask provider detected:", provider);
  
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("MetaMask accounts:", accounts);
  
        const network = await provider.getNetwork();
        console.log("MetaMask network:", network);
  
        if (Number(network.chainId) !== 5003) {
          console.log("Switching to Mantle Sepolia network...");
          await addMantleSepoliaNetwork();
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x138B" }],
          });
        }
  
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
        console.log("Connected wallet address:", walletAddress);
  
        setAccount(walletAddress);
        onConnect(walletAddress);
      } catch (err) {
        console.error("Error connecting with MetaMask:", err);
        alert("Failed to connect MetaMask.");
      }
    } else {
      alert("MetaMask is not installed! Please install MetaMask to continue.");
    }
  };
  

  const connectWithOktoWallet = async () => {
    console.log("Attempting to connect with Okto Wallet...");
    if (isOktoWalletInstalled()) {
      try {
        const provider = new ethers.BrowserProvider((window as any).Okto);
        console.log("Okto Wallet provider detected:", provider);
  
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
        console.log("Connected wallet address:", walletAddress);
  
        setAccount(walletAddress);
        onConnect(walletAddress);
      } catch (err) {
        console.error("Error connecting with Okto Wallet:", err);
        alert("Failed to connect with Okto Wallet. Please ensure Okto Wallet is installed and up-to-date.");
      }
    } else {
      alert("Okto Wallet is not detected. Please install the Okto Wallet app to continue.");
    }
  };
  
  

  // Auto-connect on page load
  useEffect(() => {
    const autoConnect = async () => {
      if (isMetaMaskInstalled()) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum, "any");
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            setAccount(walletAddress);
            onConnect(walletAddress);
          }
        } catch (err) {
          console.error("Error auto-connecting:", err);
        }
      }
    };

    autoConnect();
  }, [onConnect]);

  return (
    <div className="flex flex-col items-center">
      {account ? (
        <p className="mt-4">
          Connected Wallet: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      ) : (
        <>
          <button
            onClick={connectWithMetaMask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 m-2"
          >
            Connect with MetaMask
          </button>
          <button
            onClick={connectWithOktoWallet}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 m-2"
          >
            Connect with Okto Wallet
          </button>
        </>
      )}
    </div>
  );
};

export default WalletConnect;
