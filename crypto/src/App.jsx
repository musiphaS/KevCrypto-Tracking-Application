// import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/footer/Footer'


const App = () => {
  return (
    <div className='app'>
      <div className="dark-mode">
      <Navbar />
      <Routes>
        < Route path='/' element={<Home />} />
        < Route path='/coin/:coinId' element={<Coin />} />
      </Routes>
      <Footer />
      </div>
    </div>

  )
}

export default App
