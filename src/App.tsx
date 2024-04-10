import Homepage from './pages/Homepage/Homepage'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useState } from 'react'
import TempOutput from './components/TempOutput'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'

function App() {
  const [dish, setDish] = useState("")
  const [drink, setDrink] = useState("")
  const [side, setSide] = useState("")
  // const [sides, setSides] = useState("")
  // const callbackDish = (dishName : string) => setDish(dishName)
  // const callbackDrink = (drinkName : string) => setDrink(drinkName)
  // const callbackSides = (sidesName : string) => setSides(sidesName)

  return (
    <div className="page-wrapper">
      <div className="header">
        <img src="/logo.svg" alt="logo" />
      </div>
      <Routes>
        <Route path="/" element={<Homepage callback={setDish}/>}/>
        <Route path="/drink" element={<GetDrinks dishName={dish} callback={setDrink}/>}/>
        <Route path="/sides" element={<SidesComponent callback={setSide} />} />
        <Route path="/tempoutput" element={<TempOutput dishName={dish} sidesName={side} drinkName={drink}/>}/>
        <Route path="/cart" element={<CartComponent/>}/>
      </Routes>
    </div>
  )
}

export default App
