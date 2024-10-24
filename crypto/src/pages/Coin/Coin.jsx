import { useContext, useEffect, useState } from 'react';
import './Coin.css'
import { useParams } from 'react-router-dom' // we can find the coin id using url
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/linechart/LineChart';

const Coin = () => {

  const {coinId}  = useParams(); // get coinId from URL (for example 'bitcoin' -> /coin/bitcoin)
  // create states for storing coin and chart data
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContext); // get currency from global context

  // function to fetch single coin details
  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WKZ7gKdWWPDDTJvmPmmDsTsy'}
    };
    
    // get coin details from API coinGecko
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  // function to get 7 days price history
  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WKZ7gKdWWPDDTJvmPmmDsTsy'}
    };
    
    // get price history from API coinGecko
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  // fetch data when currency changes
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])

  // if all the data has been found, show page
  if(coinData && historicalData) {
    return (
      <div className='coin'>
        {/* coin logo and name */}
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        {/* Price chart */}
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        {/* coin statistics */}
          <div className="coin-info">
            {/* Market ranking */}
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            {/* current pricing */}
            <ul>
              <li>Current Price</li>
              <li>{currency.symbol} {coinData?.market_data?.current_price?.[currency.name]?.toLocaleString()}</li>
            </ul>
            {/* market cap */}
            <ul>
              <li>Market Cap</li>
              <li>{currency.symbol} {coinData?.market_data?.market_cap?.[currency.name]?.toLocaleString()}</li>
            </ul>
            {/* 24hrs High */}
            <ul>
              <li>24 Hour Price Change</li>
              <li>{currency.symbol} {coinData?.market_data?.high_24h?.[currency.name]?.toLocaleString()}</li>
            </ul>
            
          </div>
      </div>
    )
  } else {
    // while it is loading show spinner while waiting for the data to be fetched
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    )
  }

}

export default Coin;