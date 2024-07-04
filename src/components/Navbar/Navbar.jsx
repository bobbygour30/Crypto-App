import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (e) => {
    const currencyMap = {
      usd: { name: "usd", symbol: "$" },
      eur: { name: "eur", symbol: "€" },
      inr: { name: "inr", symbol: "₹" },
    };

    const selectedCurrency = currencyMap[e.target.value] || currencyMap["usd"];
    setCurrency(selectedCurrency);
  };

  return (
    <div className="flex justify-between items-center h-24 p-5 bg-gray-800 text-gray-300 border-b-4 border-[#064351]">
      <Link to={'/'}>
        <img src={logo} className="h-16 rounded-2xl max-w-[120px]" alt="Logo" />
      </Link>
      <ul className="hidden md:flex gap-6 ml-[140px]">
        <Link to={'/'}><li className="cursor-pointer">Home</li></Link>
        <li className="cursor-pointer">Features</li>
        <li className="cursor-pointer">Pricing</li>
        <li className="cursor-pointer">Blog</li>
      </ul>
      <div className="flex items-center gap-4">
        <select
          onChange={currencyHandler}
          className="p-1 rounded-md border-slate-50 bg-transparent text-white"
        >
          <option value="usd" className="text-white bg-[#1071a9]">
            USD
          </option>
          <option value="inr" className="text-white bg-[#1071a9]">
            INR
          </option>
          <option value="eur" className="text-white bg-[#1071a9]">
            EUR
          </option>
        </select>
        <button className="flex items-center gap-2 p-1 pr-5 pl-5 rounded-full text-base font-medium text-gray-900 bg-white border-none cursor-pointer">
          Sign Up <img className="w-3" src={arrow_icon} alt="Arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
