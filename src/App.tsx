import Homepage from './pages/Homepage/Homepage'
import './App.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { GetDrinks } from './components/DrinksComponent'
import { useState } from 'react'
import SidesComponent from './components/SidesComponent'
import CartComponent from './components/CartComponent'
import { CartItem, Item } from './service/Service'
import OrderConfirmation from './components/OrderConfirmation'

function App() {
  const [dish, setDish] = useState<Item | undefined>()
  const [drink, setDrink] = useState<Item | undefined>()
  const [sides, setSides] = useState<Item[] | undefined>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartIcon, showCartIcon] = useState(true);
  const navigate = useNavigate();

  const deleteItem = (index: number) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index))
  }



  // Delete drink 
  // Map over cartItems if "nr" equals to "index" set drink to "undefined"
  const deleteDrink = (drinki: number) => {
    console.log(drinki)
    setCartItems(prevItems => prevItems.map((item, i) => ({ ...item, drink: i !== drinki ? item.drink : undefined })))
  }

  // const deleteDrink = (itemIndex: number) => {
  //   setCartItems(prevItems =>
  //     prevItems.map((item, index) => ({
  //       ...item,
  //       drink: index === itemIndex ? undefined : item.drink // Set drink to undefined only for the specific item
  //     }))
  //   );
  // };


  const setItem = (item: string) => {
    switch (item) {
      case "dish":
        setDish(undefined);
        break;
      case "drink":
        setDrink(undefined);
        break;
      case "sides":
        setSides([]);
        break;
    }
  }

  const removeSide = (_side: Item) => setSides(sides?.filter(side => side.title != _side.title));
  const toggleCart = () => document.getElementById("cart")?.classList.toggle("cart-hidden");

  function emptyCart(): void {
    setCartItems([])

    setDish(undefined)
    setDrink(undefined)
    setSides([])
  }


  function addToCart(): void {
    setCartItems(prevItems => ([...prevItems, {
      dish: dish,
      sides: sides,
      drink: drink
    }]))

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
        <Route path="/" element={
          <Homepage
            callback={setDish} />} />

        <Route path="/sides" element={
          <SidesComponent
            callback={setSides} />} />

        <Route path="/drink" element={
          <GetDrinks
            dishName={dish?.title}
            callback={setDrink}
            showCartIcon={(value: boolean) => showCartIcon(value)} />} />

        <Route path="/cart" element={
          <CartComponent
            deleteItem={deleteItem}
            //deleteDrink={deleteDrink}
            //deleteSide={deleteSide}
            // cartItem={{ dish: dish, sides: sides, drink: drink }} 
            cartItems={cartItems}
            setCartItems={addToCart}
            title='Cart'
            setItem={setItem}
            removeSide={removeSide}
            showCartIcon={(value: boolean) => showCartIcon(value)}
          />}
        />

        <Route path="/orderconfirmation" element={
          <OrderConfirmation
            deleteItem={deleteItem}
            cartItems={cartItems}
            setCartItems={addToCart}
            callback={emptyCart}
            cartItem={{ dish: dish, sides: sides, drink: drink }}
            showCartIcon={(value: boolean) => showCartIcon(value)} />} />

      </Routes>
      <div id='cart' className='cart-popup cart-hidden'>
        <div>
          <div className='cart-header'>
            <h3>Cart</h3>
            <span onClick={toggleCart}>❌</span>
          </div>
          {cartItems.length > 0 || dish || sides!.length > 0 || drink ?
            <div className='cart-items'>
              {dish ? <div><span className='cart-item'>{dish.title}</span><span onClick={() => { setDish(undefined); setDrink(undefined); setSides([]); navigate("/"); setTimeout(() => toggleCart(), 4000); }} id='remove-icon'>🗑️</span></div> : null}
              {sides && dish ? sides.map(side => <div><span key={side._id} className='cart-item'>{side.title}</span><span onClick={() => setSides(sides.filter(_side => _side.title != side.title))} id='remove-icon'>🗑️</span></div>) : null}
              {drink && dish ? <div><span className='cart-item'>{drink.title}</span><span onClick={() => setDrink(undefined)} id='remove-icon'>🗑️</span></div> : null}
            </div>
            : <p className="redirection-text">Vänligen välj huvudrätt</p>}
        </div>
      </div>
    </div>
  )
}

export default App
