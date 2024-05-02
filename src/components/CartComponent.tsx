import { NavLink, useNavigate } from "react-router-dom";
import "./CartComponent.css"
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { resetId } from "../state/id/idSlice";
import { removeItem, removeSide, resetCart } from "../state/cart/cartSlice";
import { RootState } from "../state/store";
import { showCartIcon } from "../state/cartIcon/cartIconSlice";

const CartComponent = ({title} : {title: string}) => {
    
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart)
    const total = cart.reduce((total, menu) => total + (menu.dish?.price ?? 0) + (menu.drink?.price ?? 0) + (menu.sides ? menu.sides.reduce((sidesPrice, side) => sidesPrice + (side.price ?? 0), 0) : 0) ,0);
    const [isCartEmpty, cartIsEmpty] = useState(false);
    const navigate = useNavigate(); 
    
    
    const onEmptyCart = () => {
        dispatch(resetId());
        dispatch(resetCart());
        cartIsEmpty(true); 
        dispatch(showCartIcon(true));
        setTimeout(()=>navigate("/"),2000);
    };
        
    return !isCartEmpty ? <div className="cartTable">
        <h2>{title}</h2>

        <table >
            <thead className="cartTableHead">
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
            </thead>
            
            <tbody className="cartTableBody">
            {cart ? cart.map(menu => 
            <>
                <tr>
                    <td key={nanoid()} className="menu-bold">{menu.dish?.title}</td>
                    <td key={nanoid()} className="menu-bold">{menu.dish?.price} kr</td>
                    {title == "Cart" ? <td key={nanoid()} onClick={()=>cart.length == 1 ? onEmptyCart() : dispatch(removeItem({item: "dish", menuId: menu.id}))} className="trash">🗑️</td> : null}
                </tr>
                    {menu.sides ? menu.sides.map(side => <tr><td key={nanoid()} className="menu-light">{side.title}</td><td className="menu-light-price" key={nanoid()}>{side.price} kr</td>
                    {title == "Cart" ? <td onClick={()=>dispatch(removeSide({item: side, menuId: menu.id}))} className="trash" key={nanoid()}>🗑️</td> : null}</tr>) : null}
                    
                <tr>
                    <td className="menu-light" key={nanoid()}>{menu.drink?.title}</td>
                    <td className="menu-light-price" key={nanoid()}>{menu.drink?.price}{menu.drink ? "kr" : null}</td>
                    {(title == "Cart" && menu.drink) ? <td onClick={()=>dispatch(removeItem({item: "drink", menuId: menu.id}))} className="trash" key={nanoid()}>🗑️</td> : null}
                
                </tr>
                <tr><td  key={nanoid()} colSpan={3}><hr/></td></tr>
                </>) : <>{cartIsEmpty(true)}</>}
                <tr className="cartCost">
                    <td key={nanoid()}><strong>Total Price:</strong></td>
                    <td colSpan={2} className="cart-total" key={nanoid()}><strong>{total} kr</strong></td>
                </tr>
            </tbody>
        </table>

        {(title == "Cart") ? (<NavLink to={`/orderconfirmation/${total}`}>
                <button className="navigation-button">BESTÄLL</button>
        </NavLink>) : null}

    </div> : <p className="redirection-text">Vänligen välj huvudrätt</p>
};

export default CartComponent