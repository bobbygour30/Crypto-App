import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="min-h-[100vh] text-white bg-gradient-to-r from-[#4DA7B0] to-[#1d152f] via-[#056d90]">
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/coin/:coinId" element = {<Coin/>}/>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
