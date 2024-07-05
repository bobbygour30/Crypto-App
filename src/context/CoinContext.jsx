import React, { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [allcoin, setAllcoin] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });
  const ApiKey = import.meta.env.VITE_API_KEY; // If needed

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          console.warn(`Rate limited. Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchWithRetry(url, retries - 1, delay * 2);
        }
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (err) {
        throw new Error(`Unexpected response format: ${text}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchAllCoins = async () => {
    try {
      const data = await fetchWithRetry(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
      );
      setAllcoin(data);
    } catch (err) {
      console.error("Error fetching coin data:", err.message);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  return (
    <CoinContext.Provider value={{ allcoin, currency, setCurrency }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinProvider;
