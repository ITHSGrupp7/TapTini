import React, { useEffect, useState } from "react";
import '../App.css'

type CartItem = {
  _id: number;
  title: string;
  imageUrl: string;
  quantity: number;
  price: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const savedCartItems = localStorage.getItem('cartItems');
      console.log('Retrieved cart items:', savedCartItems);
      if (savedCartItems) {
        const parsedCartItems = JSON.parse(savedCartItems);
        if (Array.isArray(parsedCartItems)) {
          setCartItems(parsedCartItems);
        } else {
          console.error('Error: Retrieved data from localStorage is not an array.');
        }
      } else {
        console.error('Error: No cart items found in localStorage.');
      }
    } catch (error) {
      console.error('Error parsing or retrieving cart items from localStorage:', error);
    }
  }, []);

  return (
    <table className="CartItemTable">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                {/* <th>Quantity</th> */}
                <th>Cost</th>
                {/* <th>Action</th> /* header för knapparna ( ta bort ) */}
            </tr>
        </thead>
        <tbody className="CartItems">
          {cartItems.map((item) => (
              <tr key={item._id}>
              <td className=""> <img src={item.imageUrl} className="CartItemImage" alt="cartPlaceholder" /></td>
              <td>{item.title}</td>
              {/* <td>{item.quantity}</td> */}
              <td>{item.price}kr</td>
              <td><button>remove</button></td>
              </tr>
          ))}
        </tbody>
    </table>
   
  );
};

export default CartPage;
