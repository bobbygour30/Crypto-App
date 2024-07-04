import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allcoin, setAllcoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  useEffect(() => {
    const fetchAllcoins = async () => {
      const ApiKey = import.meta.env.VITE_API_KEY;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": {ApiKey},
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
          options
        );
        const data = await response.json();
        setAllcoin(data);
      } catch (err) {
        console.error(err);
        setAllcoin([]); // Fallback to an empty array in case of error
      }
    };

    fetchAllcoins();
  }, [currency]);

  const contextValue = {
    allcoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
