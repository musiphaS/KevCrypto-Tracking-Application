import { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { all } from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  // get coin list and curremcy from global context
  const {allCoin, currency} = useContext(CoinContext);

  // states for displaying coins and search input
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  // handle search input changes
  const inputHandler = (event) => {
    setInput(event.target.value);
    // if input is empty, show all coins
    if(event.target.value === "") {
      setDisplayCoin(all);
    }
  }

  // handle search form submission
  const searchHandler = async (event) => {
    event.preventDefault()
    // filter coins based on search input
    const coins = await allCoin.filter((item)=> {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }

  // update displayed coins when all coins change
  useEffect(() =>{
    setDisplayCoin(allCoin);
  },[allCoin])

  return (
  
    <div className='home'>
      {/* hero section with search */}
      <div className="hero">
       
        <h1> Global <br /> Crypto Trading Hub </h1>
        <form onSubmit={searchHandler}>
          {/* search input autocomplete */}
          <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search cryto..' required />

          <datalist id='coinlist'>
            {allCoin.map((item, index) => (<option key={index} value={item.name}/>))}
          </datalist>

          <button type='submit'>Search</button>
        </form>
      </div>

      {/* cryptocurrency table */}
      <div className="crypto-table">
        {/* table headers */}
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className='time'>24hr Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {/* table rows (top 20 coins) */}
        {
          displayCoin.slice(0,20).map((item, index)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              {/* color code price changes (green:positive , red:negative) */}
              <p className={item.price_change_percentage_24h>0 ? "green" :"red"}>
                {Math.floor(item.price_change_percentage_24h*100)/100}
              </p>
              <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
      
    </div>
  )
}

export default Home
