import React, { useEffect, useState } from "react";
import { useAccount, useBalance, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const WalletInfo = () => {
  const [balances, setBalances] = useState([]);
  const [address, setAddress] = useState("");
  const [connector, setConnector] = useState({});

  // Connect wallet
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  // Retrieve wallet information
  const { data: accountData } = useAccount({
    onConnect({ address, connector }) {
      setAddress(address);
      setConnector(connector);
    },
    onDisconnect() {
      setAddress("");
      setConnector({});
    },
  });

  // Fetch balances for connected wallet on different chains
  const { data: ethBalance, isLoading: isEthLoading } = useBalance({
    address: address,
    chainId: 1, // Ethereum mainnet
  });

  const { data: bscBalance, isLoading: isBscLoading } = useBalance({
    address: address,
    chainId: 56, // Binance Smart Chain
  });

  const { data: polygonBalance, isLoading: isPolygonLoading } = useBalance({
    address: address,
    chainId: 137, // Polygon
  });

  // Aggregate balances
  useEffect(() => {
    if (ethBalance && bscBalance && polygonBalance) {
      setBalances([
        {
          chain: "Ethereum",
          balance: ethBalance.formatted,
        },
        {
          chain: "Binance Smart Chain",
          balance: bscBalance.formatted,
        },
        {
          chain: "Polygon",
          balance: polygonBalance.formatted,
        },
      ]);
    }
  }, [ethBalance, bscBalance, polygonBalance]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-blue-50 p-8 rounded-lg shadow-xl w-full max-w-lg">
        {!address ? (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Connect Wallet
            </h2>
            <p className="text-gray-600 mb-4">
              Click the button below to connect your wallet.
            </p>
            <button
              onClick={() => connect()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Wallet Information
            </h2>
            <p className="text-gray-600 mb-4">
              Connected through:{" "}
              <span className="font-medium">{connector?.name}</span>
            </p>
            <p className="text-gray-600 mb-6">
              Address: <span className="font-medium">{address}</span>
            </p>
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              Balances
            </h4>
            {balances.length === 0 ? (
              <p className="text-gray-500">Loading balances...</p>
            ) : (
              <ul className="space-y-3 w-full">
                {balances.map((balance, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-200 transition duration-200"
                  >
                    <span className="text-sm text-gray-700">
                      {balance.chain}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {balance.balance} ETH
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
