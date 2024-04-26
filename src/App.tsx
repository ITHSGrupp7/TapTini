import Homepage from './pages/Homepage/Homepage'
import './App.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useRef, useState } from 'react'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'
import { Item, Menu } from './service/Service'
import OrderConfirmation from './components/OrderConfirmation'
import { nanoid } from '@reduxjs/toolkit'

function App() {
  // const _id = nanoid();
  const menuId = useRef(nanoid());
  const [cart, setCart] = useState<Menu[]>([{ id: menuId.current }]);
  const [showCartIcon, setShowCartIcon] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="header">
        <NavLink to={"/"}>
          <img src="/logo.svg" alt="logo" onClick={() => setShowCartIcon(true)} />
        </NavLink>
        {showCartIcon ? <div>
          <div id="basket" onClick={toggleCart}></div>
        </div> : null}
      </div>

      <Routes>
        <Route path="/"
          element={<Homepage callback={addDish} />}
        />
        <Route path="/sides"
          element={<SidesComponent callback={addSides} />}
        />
        <Route path="/drink"
          element={
            <GetDrinks
              dishName={getDishName()}
              callback={addDrink}
              showCartIcon={setShowCartIcon}
            />}
        />
        <Route path="/cart"
          element={
            <CartComponent
              cart={cart}
              emptyCart={emptyCart}
              title='Cart'
              removeItem={removeItem}
              removeSide={removeSide}
              showCartIcon={setShowCartIcon}
            />}
        />
        <Route path="/orderconfirmation/:total"
          element={
            <OrderConfirmation
              addMenu={addMenu}
              callback={emptyCart}
              cookingTime={getCookingTime()}
              cart={cart}
              showCartIcon={setShowCartIcon}
            />}
        />
      </Routes>

      <div id='cart' className='cart-popup cart-hidden'>
        <div>
          <div className='cart-header'>
            <h3>Cart</h3>
            <span onClick={toggleCart}>❌</span>
          </div>
          <div className='cart-items'>
            <PopUpShoppingCart cart={cart} removeItem={removeItem} onEmptyCart={onEmptyCart} removeSide={removeSide} />
          </div>
        </div>
      </div>
    </div>
  )


  // Event-handlers, Callbacks

  function removeItem(item: string, _menuId: string) {
    switch (item) {
      // TODO: SetCart and immediately read cart?
      case "dish":
        setCart(cart => cart.filter(menu => {
          return menu.id !== _menuId;
        }));
        if (cart.length == 0) {
          emptyCart();
        }
        break;
      case "drink":
        setCart(cart => cart.map(menu => {
          if (menu.id === _menuId) {
            const { drink, ...updatedMenu } = menu;
            drink == null;
            return updatedMenu;
          }
          return menu;
        }));
        break;
    }
  }

  function removeSide(_side: Item, _menuId: string) {
    setCart(cart => cart.map(menu => {
      if (menu.id === _menuId) {
        const updatedSides = menu.sides?.filter(side => side.title !== _side.title);
        return { ...menu, sides: updatedSides };
      }
      return menu;
    }));
  }


  function onEmptyCart() {
    emptyCart();
    navigate("/");
    setTimeout(() => toggleCart(), 4000);
  }

  function emptyCart() {
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

}

export default App

// Type for component below
type PopUpCartType = {
  cart: Menu[]
  removeItem: (item: string, _menuId: string) => void
  onEmptyCart: () => void
  removeSide: (_side: Item, _menuId: string) => void
}

// Functional component
function PopUpShoppingCart({ cart, removeItem, onEmptyCart, removeSide }: PopUpCartType) {
  {/* cart.find(_menu => _menu.dish) */ }
  // Det finns alltid en Menu i cart men den kan sakna huvudrätt.
  return cart[0].dish ?
    cart.map(_menu => <>
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
    </>)
    : <p className="redirection-text">Vänligen välj huvudrätt</p>

  // Event-handlers
  function handleClickMainDish(_menu: Menu) {
    return cart.length == 1 ? () => { removeItem("dish", _menu.id); onEmptyCart() } : () => removeItem("dish", _menu.id)
  }

  // Helper-functions
  function sideItemRow(side: Item, _menu: Menu) {
    return (
      <div>
        <span key={side._id} className='cart-item-small'>
          {side.title}
        </span>
        <span onClick={() => removeSide(side, _menu.id)} id='remove-icon'>
          🗑️
        </span>
      </div>)
  }

}

