import Homepage from './pages/Homepage/Homepage'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useState } from 'react'
import TempOutput from './components/TempOutput'

function App() {
  const [dish, setDish] = useState("")
  const [drink, setDrink] = useState("")
  const callbackDish = (dishName : string) => setDish(dishName)
  const callbackDrink = (drinkName : string) => setDrink(drinkName)

  return (
    <div className="page-wrapper">
      <div className="header">
        <img src="/logo.svg" alt="logo" />
      </div>
      <Routes>
        <Route path="/" element={<Homepage callback={callbackDish}/>}/>
        <Route path="/drink" element={<GetDrinks dishName={dish} callback={callbackDrink}/>}/>
        <Route path="/tempoutput" element={<TempOutput dishName={dish} drinkName={drink}/>}/>
      </Routes>
    </div>
  )
}

export default App
