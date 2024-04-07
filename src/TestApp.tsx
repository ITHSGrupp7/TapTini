import { useState } from 'react'
import './App.css'
import './TestApp.css'
import { GetDrinks } from './components/DrinksComponent'

function TestApp() {

  return (
    <>
      <header>
        <h2>Tap & Tini TEST APP</h2>
      </header>
      <main>
        <GetDrinks dishId={1}/>
      </main>
    </>
  )
}

export default TestApp
