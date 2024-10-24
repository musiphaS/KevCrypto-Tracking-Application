import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import CoinContextProvider from './context/CoinContext.jsx'

createRoot(document.getElementById('root')).render(  //this line grabs the 'root' element from HTML
  // helps catch common mistakes
  <React.StrictMode>
     {/* enables page navigation */}
      {/* makes cryptocurrency data avaliable everywhere */}
      <CoinContextProvider>
        {/* app is the main application */}
          <App />        
      </CoinContextProvider>
  </React.StrictMode>,
)
