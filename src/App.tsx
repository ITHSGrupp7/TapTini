import Homepage from './pages/Homepage/Homepage'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useState } from 'react'
import TempOutput from './components/TempOutput'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'
import { Item } from './service/Service'

function App() {
  const [dish, setDish] = useState<Item | undefined>()
  const [drink, setDrink] = useState<Item | undefined>()
  const [side, setSide] = useState<Item | undefined>()
  // const [sides, setSides] = useState("")

  return (
    <div className="page-wrapper">
      <div className="header">
        <img src="/logo.svg" alt="logo" />
        <div className='cart' >
          <div onClick={() => document.getElementById("cart")?.classList.toggle("cart-hidden")}></div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Homepage callback={setDish} />} />
        <Route path="/sides" element={<SidesComponent callback={setSide} />} />
        <Route path="/drink" element={<GetDrinks dishName={dish?.title} callback={setDrink} />} />
        {/* <Route path="/tempoutput" element={<TempOutput dishName={dish} sidesName={side} drinkName={drink}/>}/> */}
        <Route path="/cart" element={<CartComponent dish={dish!} sides={side!} drink={drink!} />} />
      </Routes>

      <div id='cart' className='cart-popup cart-hidden'>
        <div>
          <div className='cart-header'>
            <h3>Cart</h3>
            <span onClick={() => document.getElementById("cart")?.classList.add("cart-hidden")}>❌</span>
          </div>
          {dish || side || drink ?
            <div className='cart-items'>
              <p>{dish?.title}</p>
              <p>{side?.title}</p>
              <p>{drink?.title}</p>
            </div>
            : <p>No items in cart</p>}
        </div>
      </div>
    </div>
  )
}

export default App
