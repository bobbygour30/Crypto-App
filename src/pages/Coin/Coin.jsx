import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          console.warn(`Rate limited. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(url, retries - 1, delay * 2);
        }
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const fetchCoinData = async () => {
    try {
      const data = await fetchWithRetry(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      setCoinData(data);
    } catch (err) {
      console.error("Error fetching coin data:", err.message);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const data = await fetchWithRetry(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`
      );
      setHistoricalData(data);
    } catch (err) {
      console.error("Error fetching historical data:", err.message);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchCoinData();
      fetchHistoricalData();
    }, 500); // Adjust the delay as necessary

    return () => clearTimeout(debounceFetch);
  }, [coinId, currency]);

  if (coinData && historicalData) {
    return (
      <div className="px-0 pt-5 pb-5 mt-10">
        <div className="flex flex-col items-center gap-5 mx-24 my-auto mb-12">
          <img className="max-w-24" src={coinData.image.large} alt={coinData.name} />
          <p className="text-xl font-medium">
            <b className="text-4xl font-medium">{coinData.name}</b>
          </p>
        </div>
        <div className="max-w-[600px] h-[250px] m-auto">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="max-w-[600px] mx-auto mt-11 flex flex-col">
          <ul className="flex justify-between px-2 py-1 border-[#5f5d5f] border-b-2">
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul className="flex justify-between px-2 py-1 border-[#5f5d5f] border-b-2">
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between px-2 py-1 border-[#5f5d5f] border-b-2">
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between px-2 py-1 border-[#5f5d5f] border-b-2">
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul className="flex justify-between px-2 py-1 border-[#5f5d5f] border-b-2">
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid place-self-center min-h-[80vh]">
        <div className="w-[65px] h-[65px] place-self-center border-4 border-t-[#18486f48] rounded-full animate-spin"></div>
      </div>
    );
  }
};

export default Coin;
