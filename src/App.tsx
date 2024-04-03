import { useState } from 'react'
import './App.css'
import { MenuCourseComponent } from './components/Data/MenuCourseComponent'

function App() {
  const [home,  setHome] = useState(<MenuCourseComponent/>)

  return (
    <>
     <header>
      <img className="Logo" src="/src/assets/images/Tap&TiniTrans.png" alt='Tap&Tini Logo'></img>
          <nav>
              <section className="cart">
                  <a href="/cart">
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                  </a>
              </section>
          </nav>
     </header>

      <main className='content'>
        {home}
      </main>
    </>
  )
}

export default App
