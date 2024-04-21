import Homepage from './pages/Homepage/Homepage'
import './App.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useState } from 'react'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'
import { Item } from './service/Service'
import OrderConfirmation from './components/OrderConfirmation'

function App() {
  const [dish, setDish] = useState<Item | undefined>()
  const [drink, setDrink] = useState<Item | undefined>()
  const [sides, setSides] = useState<Item[] | undefined>([])

  const [cartIcon, toggleCartIcon] = useState(true);
  const navigate = useNavigate(); 
  function toggleCart(){
    document.getElementById("cart")?.classList.toggle("cart-hidden");
  }

  function emptyCart(): void {
    setDish(undefined)
    setDrink(undefined)
    setSides([])
  }

  return (
    <div className="page-wrapper">
      <div className="header">
        <NavLink to={"/"}>
          <img src="/logo.svg" alt="logo" />
        </NavLink>
        {cartIcon ? <div>
          <div id="basket" onClick={toggleCart}></div>
        </div> : null}
        
      </div>
      <Routes>
        <Route path="/" element={<Homepage callback={setDish} />} />
        <Route path="/sides" element={<SidesComponent callback={setSides} />} />
        <Route path="/drink" element={<GetDrinks dishName={dish?.title} callback={setDrink} toggleCartIcon={() => toggleCartIcon(cartIcon==true ? false : true)} />} />
        <Route path="/cart" element={<CartComponent cartItem={{ dish: dish, sides: sides, drink: drink }} title='Cart' />} />
        <Route path="/orderconfirmation/:total" element={<OrderConfirmation cookingTime={dish?.timeInMins} callback={emptyCart} cartItem={{ dish: dish, sides: sides, drink: drink }} toggleCartIcon={() => toggleCartIcon(cartIcon==true ? false : true)}/>} />
      </Routes>
      
      <div id='cart' className='cart-popup cart-hidden'>
        <div>
          <div className='cart-header'>
            <h3>Cart</h3>
            <span onClick={toggleCart}>❌</span>
          </div>
          {dish || sides!.length > 0 || drink ?
            <div className='cart-items'>
              {dish ? <div><span className='cart-item'>{dish.title}</span><span onClick={()=>{setDish(undefined); setDrink(undefined); setSides([]); navigate("/");}} id='remove-icon'>🗑️</span></div> : null}
              {sides && dish ? sides.map(side => <div><span key={side._id} className='cart-item'>{side.title}</span><span onClick={()=>setSides(sides.filter(_side => _side.title != side.title))} id='remove-icon'>🗑️</span></div>) : null}
              {drink && dish ? <div><span className='cart-item'>{drink.title}</span><span onClick={()=>setDrink(undefined)} id='remove-icon'>🗑️</span></div> : null}
            </div>
            : <p>No items in cart</p>}
        </div>
      </div>
    </div>
  )
}

export default App
