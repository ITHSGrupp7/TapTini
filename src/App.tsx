import Homepage from './pages/Homepage/Homepage'
import './App.css'
import { NavLink, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useRef, useState, useEffect } from 'react'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'
import { Item, Menu } from './service/Service'
import OrderConfirmation from './components/OrderConfirmation'
import { nanoid } from '@reduxjs/toolkit'

function App() {

  const location = useLocation();
  const storedCart = localStorage.getItem('cart');
  const storedId = localStorage.getItem('order_id');

  const menuId = useRef(storedId ? storedId : nanoid());
  const initialCart = storedCart ? JSON.parse(storedCart) : [{ id: menuId.current }];

  const [cart, setCart] = useState<Menu[]>(initialCart);
  const navigate = useNavigate();

  const [isCartEmpty, setIsCartEmpty] = useState(cart[0]?.dish ? false : true);

  useEffect(() => {
    const storedPath = localStorage.getItem('path');
    if (storedPath) {
      navigate(storedPath)
    }
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      initializeCart();
      setTimeout(() => { navigate("/") }, 3000);
    }
    // Is dish undefined or null?
    if (cart.length === 1 && !cart[0].dish) {
      setIsCartEmpty(true)
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('path', location.pathname);
  }, [location]);

  return (
    <div className="page-wrapper">
      <div className="header">
        <NavLink to={"/"}>
          <img src="/logo.svg" alt="logo" />
        </NavLink>
        {showPopUpCart() && (
          <>
            <div className="cartPositioning">
              <div className='cartIcon' id={isCartEmpty ? "basket" : "basketFilled"} onClick={toggleCart}>
              </div>
              <div className='cartCounter'>
                <span>{countItemsInCart()}</span>
              </div>
            </div>
          </>)}
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
              removeItem={removeItem}
              removeSide={removeSide}
              isCartEmpty={isCartEmpty}
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
      <PopUpShoppingCart cart={cart} removeItem={removeItem} removeSide={removeSide} toggleCart={toggleCart} isCartEmpty={isCartEmpty} />
    </div>
  )

  // Event-handlers, Callbacks
  function initializeCart() {
    setIsCartEmpty(true)
    menuId.current = nanoid();
    localStorage.setItem('order_id', menuId.current);
    setCart(_ => [{ id: menuId.current }]);
  }

  function addMenu() {
    menuId.current = nanoid();
    localStorage.setItem('order_id', menuId.current);
    setCart(cart => [...cart, { id: menuId.current }]);
  }

  function addDish(_dish: Item) {
    setIsCartEmpty(false)
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

  function removeItem(item: string, _menuId: string) {
    switch (item) {
      case "dish":
        // if (cart.length === 1) {
        //   initializeCart();
        //   setTimeout(() => { navigate("/") }, 3000);
        //   return;
        // }
        // // Is dish undefined or null?
        // if (cart.length === 2 && !cart[1].dish) {
        //   setIsCartEmpty(true)
        // }
        setCart(prevCart => prevCart.filter(menu => menu.id !== _menuId))
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

  // Helper-functions
  function toggleCart() {
    document.getElementById("cart")?.classList.toggle("cart-hidden");
  }

  function getDishName(): string | undefined {
    return cart.find(menu => menu.id === menuId.current)?.dish?.title
  }

  // TODO: Get max cooking time. Math.max(...times);
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

  function countItemsInCart(): number {
    let counter = 0;
    cart.forEach(menu => {
      counter += menu.dish ? 1 : 0
      menu.sides?.forEach(_ => {
        counter += 1
      })
      counter += menu.drink ? 1 : 0
    })
    return counter
  }
}

// Type for component below
type PopUpCartType = {
  cart: Menu[]
  removeItem: (item: string, _menuId: string) => void
  removeSide: (_side: Item, _menuId: string) => void
  toggleCart: () => void
  isCartEmpty: boolean
}

// Functional component
function PopUpShoppingCart({ cart, removeItem, removeSide, toggleCart, isCartEmpty }: PopUpCartType) {
  return <div id='cart' className='cart-popup cart-hidden'>
    <div>
      <div className='cart-header'>
        <h3>Cart</h3>
        <span onClick={toggleCart}>❌</span>
      </div>
      {(!isCartEmpty ?
        cart.map(_menu => <div key={_menu.id} className='cart-items'>
          {_menu.dish && (
            <>
              <div>
                <span className='cart-item-dish'>
                  {_menu.dish.title}
                </span>
                <span onClick={() => removeItem("dish", _menu.id)} id='remove-icon'>
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
        : <><p className="redirection-text">Vänligen välj huvudrätt</p>{onEmptyCart()}</>)}
    </div>
  </div>

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

  function onEmptyCart() {
    setTimeout(() => { document.getElementById("cart")?.classList.add("cart-hidden") }, 3000);
  }
}

export default App


