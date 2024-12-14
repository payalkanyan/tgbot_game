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

  // Function to add Mantle Sepolia network
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

  // Function to connect MetaMask
  const connectWithMetaMask = async () => {
    if (isMetaMaskInstalled()) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum, "any");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const network = await provider.getNetwork();

        if (Number(network.chainId) !== 5003) {
          await addMantleSepoliaNetwork();
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x138B" }], // Chain ID: 5003 in hex
          });
        }

        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
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

  // Function to connect using WalletConnect
  const connectWithWalletConnect = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        5003: MANTLE_SEPOLIA_RPC_URL,
      },
    });

    try {
      await provider.enable();
      const web3Provider = new ethers.BrowserProvider(provider, "any");
      const signer = await web3Provider.getSigner();
      const walletAddress = await signer.getAddress();
      setAccount(walletAddress);
      onConnect(walletAddress);
    } catch (err) {
      console.error("Error connecting with WalletConnect:", err);
      alert("Failed to connect with WalletConnect.");
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
            onClick={connectWithWalletConnect}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 m-2"
          >
            Connect with WalletConnect
          </button>
        </>
      )}
    </div>
  );
};

export default WalletConnect;
