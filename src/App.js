import React from "react";
import Connect from "./components/Connect.jsx";
import WalletInfo from "./components/WalletInfo.jsx";
// import Part3 from "./components/Part3.jsx";
import "./index.css";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 via-purple-500 to-pink-600 flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg space-y-8">
        <Connect />
        <WalletInfo />
        {/* <Part3 /> */}
      </div>
    </div>
  );
};

export default App;
