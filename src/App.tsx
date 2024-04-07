import Homepage from './pages/Homepage/Homepage'
import './App.css'

function App() {
  // const [page, setPage] = useState(<Meny />)
  

  return (
    <div className="page-wrapper">
      <div className="header">
        <img src="/logo.svg" alt="logo" />
      </div>

      <Homepage />
    
    </div>
  )
}

export default App