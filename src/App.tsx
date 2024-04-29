import Homepage from './pages/Homepage/Homepage'
import './App.css'
import { NavLink, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useRef, useState } from 'react'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'
import { Item, Menu } from './service/Service'
import OrderConfirmation from './components/OrderConfirmation'
import { nanoid } from '@reduxjs/toolkit'

function App() {
  const menuId = useRef(nanoid());
  const [cart, setCart] = useState<Menu[]>([{ id: menuId.current }]);
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="header">
        <NavLink to={"/"}>
          <img src="/logo.svg" alt="logo" />
        </NavLink>
        {showPopUpCart() && <div>
          <div id="basket" onClick={toggleCart}></div>
        </div>}
      </div>

      <Routes>
        <Route path="/"
          element={<Homepage addDish={addDish} />}
        />
        <Route path="/sides"
          element={<SidesComponent addSides={addSides} />}
        />
        <Route path="/drink"
          element={
            <GetDrinks
              dishName={getDishName()}
              chooseDrink={addDrink}
            />}
        />
        <Route path="/cart"
          element={
            <CartComponent
              cart={cart}
              initializeCart={initializeCart}
              removeItem={removeItem}
              removeSide={removeSide}
            />}
        />
        <Route path="/orderconfirmation/:total"
          element={
            <OrderConfirmation
              addMenu={addMenu}
              initializeCart={initializeCart}
              cookingTime={getCookingTime()}
              cart={cart}
            />}
        />
      </Routes>
      <PopUpShoppingCart cart={cart} removeItem={removeItem} onEmptyCart={onEmptyCart} removeSide={removeSide} toggleCart={toggleCart} />
    </div>
  )


  // Event-handlers, Callbacks
  function removeItem(item: string, _menuId: string) {
    switch (item) {
      case "dish":
        setCart(prevCart => prevCart.filter(menu => menu.id !== _menuId))
        if (cart.length === 0) {
          initializeCart();
        }
        break;
      case "drink":
        setCart(prevCart => prevCart.map(prevMenu => ({
          ...prevMenu,
          drink: prevMenu.id === _menuId ? undefined : prevMenu.drink
        })))
        break;
    }
  }

  function removeSide(_side: Item, _menuId: string) {
    setCart(cart => cart.map(menu => {
      if (menu.id === _menuId) {
        const updatedSides = menu.sides?.filter(side => side.title !== _side.title);
        return { ...menu, sides: updatedSides };
      } else {
        return menu;
      }
    }));
  }

  function onEmptyCart() {
    initializeCart();
    navigate("/");
    setTimeout(() => {document.getElementById("cart")?.classList.add("cart-hidden")}, 4000);
  }

  function initializeCart() {
    menuId.current = nanoid();
    setCart([{ id: menuId.current }]);
  }

  function addDish(_dish: Item) {
    setCart(cart => cart.map(menu => {
      if (menu.id === menuId.current) {
        return { ...menu, dish: _dish }
      }
      return menu;
    }));
  }

  function addSides(_sides: Item[]) {
    setCart(cart => cart.map(menu => {
      if (menu.id === menuId.current) {
        return { ...menu, sides: _sides }
      }
      return menu;
    }));
  }

  function addDrink(_drink: Item) {
    setCart(cart => cart.map(menu => {
      if (menu.id === menuId.current) {
        return { ...menu, drink: _drink }
      }
      return menu;
    }));
  }

  function addMenu() {
    menuId.current = nanoid();
    setCart(cart => [...cart, { id: menuId.current }]);
  }


  // Helper-functions
  function toggleCart() {
    document.getElementById("cart")?.classList.toggle("cart-hidden");
  }

  function getDishName(): string | undefined {
    return cart.find(menu => menu.id === menuId.current)?.dish?.title
  }

  function getCookingTime(): number | undefined {
    return cart?.find(_menu => _menu.id === menuId.current)?.dish?.timeInMins
  }

  function showPopUpCart(): boolean {
    const location = useLocation()
    const isRoot = location.pathname === '/'
    const isSides = location.pathname.includes('/sides')
    const isDrink = location.pathname.includes('/drink')
    return isRoot || isSides || isDrink
  }

}

export default App

// Type for component below
type PopUpCartType = {
  cart: Menu[]
  removeItem: (item: string, _menuId: string) => void
  onEmptyCart: () => void
  removeSide: (_side: Item, _menuId: string) => void
  toggleCart: () => void
}

// Functional component
function PopUpShoppingCart({ cart, removeItem, onEmptyCart, removeSide, toggleCart }: PopUpCartType) {
  return <div id='cart' className='cart-popup cart-hidden'>
    <div>
      <div className='cart-header'>
        <h3>Cart</h3>
        <span onClick={toggleCart}>❌</span>
      </div>
      {/* Det finns alltid en Menu i cart men den kan sakna huvudrätt. */}
      {(cart[0].dish ?
        cart.map(_menu => <div key={_menu.id} className='cart-items'>
          {_menu.dish && (
            <>
              <div>
                <span className='cart-item-dish'>
                  {_menu.dish.title}
                </span>
                <span onClick={handleClickMainDish(_menu)} id='remove-icon'>
                  🗑️
                </span>
              </div>
              {_menu.sides?.map(side => sideItemRow(side, _menu))}
              {_menu.drink && (
                <div>
                  <span className='cart-item-small'>
                    {_menu.drink.title}
                  </span>
                  <span onClick={() => removeItem("drink", _menu.id)} id='remove-icon'>
                    🗑️
                  </span>
                </div>
              )}
            </>
          )}
        </div>)
        : <p className="redirection-text">Vänligen välj huvudrätt</p>)}
    </div>
  </div>


  // Event-handlers
  function handleClickMainDish(_menu: Menu) {
    return cart.length == 1 ? () => { removeItem("dish", _menu.id); onEmptyCart() }
      : () => removeItem("dish", _menu.id)
  }

  // Helper-functions
  function sideItemRow(side: Item, _menu: Menu) {
    return (
      <div key={side._id}>
        <span className='cart-item-small'>
          {side.title}
        </span>
        <span onClick={() => removeSide(side, _menu.id)} id='remove-icon'>
          🗑️
        </span>
      </div>)
  }



}

