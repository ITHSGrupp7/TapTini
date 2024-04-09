import Homepage from './pages/Homepage/Homepage'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useState } from 'react'
import TempOutput from './components/TempOutput'
import { ShoppingCart, Item, Drink } from './service/Service'

function App() {
  
  // const [dish, setDish] = useState("")
  // const [drink, setDrink] = useState("")
  // //const [addons, setAddons] = useState<String[]>([])
  // const callbackDish = (dishName : string) => setDish(dishName)
  // const callbackDrink = (drinkName : string) => setDrink(drinkName)
  
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | undefined>()
  
  const callbackMainDish = (dish : Item) : void => { 
      setShoppingCart((prevCart = {}) => ({...prevCart, mainDish : dish}))
  }

  const callBackDrink = (dr : Drink) => {
    setShoppingCart((prevCart) => ({...prevCart, drink : dr}))
  }

  const callbackAddOns = (addOn : Item) => {
    setShoppingCart((prevCart) => ({...prevCart, addOns : [...shoppingCart?.addOns || [], addOn]}))
  }

const trimTitle = (title: string) => title.split(' ').slice(1).join(' ');

  return (
    <div className="page-wrapper">
      <div className="header">
        <img src="/logo.svg" alt="logo" />
      </div>
      <Routes>
        <Route path="/" element={<Homepage callback={callbackMainDish}/>}/>
        <Route path="/drink" element={<GetDrinks dishName={trimTitle(shoppingCart?.mainDish?.title ?? "")} callback={callBackDrink}/>}/>
        <Route path="/tempoutput" element={<TempOutput cart={shoppingCart}/>}/>
      </Routes>
    </div>
  )
}

export default App
