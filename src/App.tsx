import Homepage from './pages/Homepage/Homepage'
import './App.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'
import OrderConfirmation from './components/OrderConfirmation'
import { useDispatch, useSelector } from 'react-redux'
import { resetId } from './state/id/idSlice'
import { removeItem, removeSide, resetCart } from './state/cart/cartSlice'
import { RootState } from './state/store'
import { nanoid } from '@reduxjs/toolkit'
import { showCartIcon } from './state/cartIcon/cartIconSlice'

const App = () => {
  
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const cartIcon = useSelector((state: RootState) => state.cartIcon);
  const toggleCart = () => document.getElementById("cart")?.classList.toggle("cart-hidden");
  const navigate = useNavigate(); 
  
  
  const onEmptyCart = () =>{
    dispatch(resetCart());
    dispatch(resetId());
    navigate("/"); 
    setTimeout(()=>toggleCart(),4000);
  }

  return (
    <div className="page-wrapper">
      <div className="header">
        <NavLink to={"/"}>
          <img src="/logo.svg" alt="logo" onClick={()=>dispatch(showCartIcon(true))}/>
        </NavLink>
        {cartIcon ? <div>
          <div id="basket" onClick={toggleCart}></div>
        </div> : null}
        
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sides" element={<SidesComponent />} />
        <Route path="/drink" element={<GetDrinks />} />
        <Route path="/cart" element={<CartComponent title='Cart' />} />
        <Route path="/orderconfirmation/:total" element={<OrderConfirmation />} />
      </Routes>
      <div id='cart' className='cart-popup cart-hidden'>
        <div>
          <div className='cart-header'>
            <h3>Cart</h3>
            <span onClick={toggleCart}>❌</span>
          </div>
          
            <div className='cart-items'>
              
              {cart.find(_menu => _menu.dish) ? cart?.map(_menu => <>
              {_menu.dish ? <div><span className='cart-item-dish' 
              key={nanoid()}>{_menu.dish?.title}</span><span key={nanoid()} 
              onClick={()=>cart.length == 1 ? onEmptyCart() : dispatch(removeItem({item: "dish", menuId: _menu.id}))} 
              id='remove-icon'>🗑️</span></div> : null}
              
              {_menu.sides && _menu.dish ? _menu.sides.map(side => <div><span key={nanoid()} className='cart-item-small'>{side.title}</span>
              <span key={nanoid()} onClick={()=>dispatch(removeSide({item: side, menuId: _menu.id}))} id='remove-icon'>🗑️</span></div>) : null}
              
              {_menu.drink && _menu.dish ? <div><span key={nanoid()} className='cart-item-small'>{_menu.drink.title}</span>
              <span key={nanoid()} onClick={()=>dispatch(removeItem({item: "drink", menuId: _menu.id}))} id='remove-icon'>🗑️</span></div> : null}</>)
              : <p className="redirection-text">Vänligen välj huvudrätt</p>}
            
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default App
