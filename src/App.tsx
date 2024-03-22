import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MenyCourseComponent } from './components/Data/MenyCourseComponent'

function App() {
  const [page, setPage] = useState(<MenyCourseComponent/>)

  return (
    <>
      <header>
       <img className="Logo" src="/src/assets/images/Tap&Tini Trans.png" alt='Tap&Tini Logo'></img>
        <a href="/cart">
          <span className="material-symbols-outlined">
            shopping_cart
          </span>
        </a>
      </header>

      <main className='content'>
        {page}
      </main>
    </>
  )
}

export default App
