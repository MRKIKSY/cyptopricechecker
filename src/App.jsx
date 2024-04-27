import React, { useEffect, useState } from "react";
import axios from 'axios';
<<<<<<< HEAD
import "./App.css";
=======

>>>>>>> 770fa7a75f648a7a1bdc1f4b4a2d0e012a3e5a7b

function App() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    axios.get('https://openapiv1.coinstats.app/coins?limit=20', {
      headers: { 'X-API-KEY': 'CZc3+WutOiHY9BGnKcXzZJiDbL4ci/kyI89GPA4zqZI=' }
    })
      .then(res => {
        console.log("API response:", res.data);
        setCurrency(res.data.result); // Updated to access `result` property
      })
      .catch(err => console.error("Error fetching data:", err));

    // Set interval to update current date and time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h2>MR KIKSY Crypto Currency Price Checker </h2>
      <p>{currentDateTime}</p>
      <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
            <th>Volume (24hr)</th>
          </tr>
        </thead>
        <tbody>
          {currency.filter(val =>
            val.name.toLowerCase().includes(search.toLowerCase()) ||
            val.symbol.toLowerCase().includes(search.toLowerCase())
          ).map((val, index) => (
            <tr key={index}>
              <td className="rank">{val.rank}</td>
              <td className="logo">
                <a href={val.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <img src={val.icon} alt={val.name} />
                </a>
                <p>{val.name}</p>
              </td>
              <td className="symbol">{val.symbol}</td>
              <td className="marketcap">${val.marketCap}</td>
              <td className="price">${val.price.toFixed(2)}</td>
              <td className="availablesupply">{val.availableSupply}</td>
              <td className="volume">{val.volume.toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
