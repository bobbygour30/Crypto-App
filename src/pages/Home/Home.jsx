import React, { useContext, useState, useEffect } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allcoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(Array.isArray(allcoin) ? allcoin : []);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    if (Array.isArray(allcoin)) {
      const coins = allcoin.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase());
      });
      setDisplayCoin(coins);
    }
  };

  useEffect(() => {
    setDisplayCoin(Array.isArray(allcoin) ? allcoin : []);
  }, [allcoin]);

  return (
    <div className="p-5 pb-20 md:p-10 lg:p-20">
      <div className="max-w-[2000px] mt-16 flex flex-col items-center text-center gap-12">
        <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl">
          CryptoNest
        </h1>
        <p className="text-base sm:text-lg">
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more <br className="hidden sm:block" /> about cryptos.
        </p>
        <form
          onSubmit={searchHandler}
          className="p-2 bg-white rounded text-lg flex flex-col sm:flex-row justify-between items-center gap-5 w-full sm:w-auto"
        >
          <input
            onChange={inputHandler}
            className="flex-1 text-black w-full md:w-[400px] text-lg outline-none border-none pl-2"
            type="text"
            placeholder="Search Crypto..."
            required
            value={input}
            list="coinlist"
          />
          <datalist id="coinlist">
            {Array.isArray(allcoin) &&
              allcoin.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
          </datalist>
          <button
            className="border-none bg-[#1b95e6] text-white text-lg p-2 pl-6 pr-6 rounded-full w-full sm:w-auto"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="max-w-full md:max-w-[1000px] lg:max-w-none m-auto bg-[#175273] rounded-lg mt-14 overflow-x-auto">
        <div className="table-layout grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] sm:grid-cols-[1fr_3fr_1.5fr_1.5fr_2fr] p-[15px] px-[20px] items-center border-b-2 border-[#3c3c3c] text-sm sm:text-base">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-right">Market Cap</p>
        </div>
        {Array.isArray(displayCoin) &&
          displayCoin.slice(0, 10).map((item, index) => (
            <Link
              to={`/coin/${item.id}`}
              className="last:border-none grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] sm:grid-cols-[1fr_3fr_1.5fr_1.5fr_2fr] p-[15px] px-[20px] items-center border-b-2 border-[#3c3c3c] text-sm sm:text-base"
              key={index}
            >
              <p>{item.market_cap_rank}</p>
              <div className="flex items-center gap-2">
                <img className="w-6 sm:w-10" src={item.image} alt="" />
                <p>{item.name}</p>
              </div>
              <p>
                {currency.symbol}
                {item.current_price ? item.current_price.toLocaleString() : ""}
              </p>
              <p
                className={
                  item.price_change_percentage_24h > 0
                    ? "text-green-500 text-center"
                    : "text-red-500 text-center"
                }
              >
                {item.price_change_percentage_24h
                  ? Math.floor(item.price_change_percentage_24h * 100) / 100
                  : ""}
              </p>
              <p className="text-right">
                {currency.symbol}{" "}
                {item.market_cap ? item.market_cap.toLocaleString() : ""}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
