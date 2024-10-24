import { useContext } from 'react' // to use context
import './Navbar.css';
import { CoinContext } from '../../context/CoinContext'; //global state
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';


const Navbar = () => {

  const {setCurrency} = useContext(CoinContext) // get currency set from context

  // currency seletion handler
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
      <Link to={'/'}> {/* this directs us to homepage */}
      <h1>KevCrypto</h1>
      </Link>

        <div className='nav-right'>
            <select onChange={currencyHandler} className='dark-mode'>
                <option value="usd">USD</option> {/* currency selection*/}
                <option value="eur">EUR</option>
            </select>
            <ThemeSwitcher/> {/* dark/light mode switcher*/}
        </div>
    </div>
  )
}

export default Navbar
