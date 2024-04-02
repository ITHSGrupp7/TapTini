import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState(<div></div>)

  return (
    <>
      <header>
      </header>
      <main className='content'>
        {page}
      </main>
    </>
  )
}

export default App