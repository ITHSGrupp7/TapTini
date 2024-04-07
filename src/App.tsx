import Homepage from './pages/Homepage/Homepage'
import TestApp from './TestApp'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useState } from 'react'

function App() {
  // const [page, setPage] = useState(<Meny />)
  const [dish, setDish] = useState("")
  const callback = (dishName : string) => setDish(dishName)

  return (
    <div className="page-wrapper">
      <div className="header">
        <img src="/logo.svg" alt="logo" />
      </div>
      <Routes>
        <Route path="/" element={<Homepage callback={callback}/>}/>
        <Route path="/drink/:name" element={<GetDrinks dishName={1} />}/>
      </Routes>
    </div>
  )
}

export default App