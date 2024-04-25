import Homepage from './pages/Homepage/Homepage'
import './App.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useRef, useState } from 'react'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'
import { Item, Menu} from './service/Service'
import OrderConfirmation from './components/OrderConfirmation'
import { nanoid } from '@reduxjs/toolkit'

function App() {
  const _id = nanoid();
  const menuId = useRef(_id);
  const [cart, setCart] = useState<Menu[]>([{id : _id}]);
  
  const removeItem = (item : string, _menuId : string) => {
    switch (item){
      case "dish":
        setCart(cart => cart.filter(menu => {
          return menu.id !== _menuId;
        }));
        if (cart.length == 0){
         emptyCart();
        }
        break;
        case "drink":
          setCart(cart => cart.map(menu => {
            if (menu.id === _menuId){
              const {drink, ...updatedMenu} = menu;
              drink == null;
              return updatedMenu;
            }
            return menu;
          }));
          break;
    }
  }
  const removeSide = (_side : Item, _menuId : string) => {
    setCart(cart => cart.map(menu => {
      if (menu.id === _menuId){
        const updatedSides = menu.sides?.filter(side => side.title !== _side.title);
        return {...menu, sides : updatedSides};
      }
      return menu;
    }));
  }
  const toggleCart = () => document.getElementById("cart")?.classList.toggle("cart-hidden");
  const [cartIcon, showCartIcon] = useState(true);
  const navigate = useNavigate(); 
  
  
  function onEmptyCart(){
    emptyCart();
    navigate("/"); 
    setTimeout(()=>toggleCart(),4000);
  }

  function emptyCart() {
    const newMenuId = nanoid();
    setCart([{id : newMenuId}]);
    menuId.current = newMenuId;
  }

  function addDish(_dish : Item){
    setCart(cart => cart.map(menu => {
      if (menu.id === menuId.current){
        return {...menu, dish : _dish}
      }
      return menu;
    }));
  }

  function addSides(_sides : Item[]){
    setCart(cart => cart.map(menu => {
      if (menu.id === menuId.current){
        return {...menu, sides : _sides}
      }
      return menu;
    }));
  }

  function addDrink(_drink : Item){
    setCart(cart => cart.map(menu => {
      if (menu.id === menuId.current){
        return {...menu, drink : _drink}
      }
      return menu;
    }));
  }

  const addMenu = () => {
    const newMenuId = nanoid();
    setCart(cart => [...cart, {id : newMenuId}]);
    menuId.current = newMenuId;
  }

  return (
    <div className="page-wrapper">
      <div className="header">
        <NavLink to={"/"}>
          <img src="/logo.svg" alt="logo" onClick={()=>showCartIcon(true)}/>
        </NavLink>
        {cartIcon ? <div>
          <div id="basket" onClick={toggleCart}></div>
        </div> : null}
        
      </div>
      <Routes>
        <Route path="/" element={<Homepage callback={addDish}/>} />
        <Route path="/sides" element={<SidesComponent callback={addSides} />} />
        <Route path="/drink" element={<GetDrinks dishName={cart.find(menu => menu.id === menuId.current)?.dish?.title} callback={addDrink} showCartIcon={(value : boolean) => showCartIcon(value)} />} />
        <Route path="/cart" element={<CartComponent cart={cart} emptyCart={emptyCart} title='Cart' removeItem={removeItem} removeSide={removeSide} showCartIcon={(value : boolean) => showCartIcon(value)}/>} />
        <Route path="/orderconfirmation/:total" element={<OrderConfirmation addMenu={addMenu} callback={emptyCart} cookingTime={cart?.find(_menu => _menu.id === menuId.current)?.dish?.timeInMins} cart={cart} showCartIcon={(value : boolean) => showCartIcon(value)}/>} />
      </Routes>
      <div id='cart' className='cart-popup cart-hidden'>
        <div>
          <div className='cart-header'>
            <h3>Cart</h3>
            <span onClick={toggleCart}>❌</span>
          </div>
          
            <div className='cart-items'>
              {cart.find(_menu => _menu.dish) ? cart?.map(_menu => <>
              {_menu.dish ? <div><span className='cart-item-dish'>{_menu.dish?.title}</span><span onClick={cart.length == 1 ? ()=>{removeItem("dish", _menu.id); onEmptyCart()} : ()=>removeItem("dish", _menu.id)} id='remove-icon'>🗑️</span></div> : null}
              {_menu.sides && _menu.dish ? _menu.sides.map(side => <div><span key={side._id} className='cart-item-small'>{side.title}</span><span onClick={()=>removeSide(side, _menu.id)} id='remove-icon'>🗑️</span></div>) : null}
              {_menu.drink && _menu.dish ? <div><span className='cart-item-small'>{_menu.drink.title}</span><span onClick={()=>removeItem("drink", _menu.id)} id='remove-icon'>🗑️</span></div> : null}</>)
              : <p className="redirection-text">Vänligen välj huvudrätt</p>}
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default App
