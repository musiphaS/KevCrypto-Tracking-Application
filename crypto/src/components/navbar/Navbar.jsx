import { useContext } from 'react'
import './Navbar.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';


const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (event) => {
    switch (event.target.value){
      case "usd": {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
      case "eur": {
        setCurrency({name: "eur", symbol: "€"});
        break;
      }
      default: {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
    }
  }
  return (
    <div className='navbar dark-mode'>
      <Link to={'/'}>
      <h1>KevCrypto</h1>
      </Link>

        <div className='nav-right'>
            <select onChange={currencyHandler} className='dark-mode'>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
            </select>
            <ThemeSwitcher/>
        </div>
    </div>
  )
}

export default Navbar
