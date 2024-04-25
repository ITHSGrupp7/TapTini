// import { useSelector } from "react-redux"
// import { RootState } from "../state/store"
import { NavLink, useNavigate } from "react-router-dom";
import { Item, Menu} from "../service/Service";
import "./CartComponent.css"
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
// import { useDispatch } from 'react-redux';

type CartComponentProps = {
    cart : Menu[],
    title : string,
    emptyCart : () => void;
    removeItem : (item : string, menuId : string) => void;
    removeSide : (side : Item, menuId : string) => void;
    showCartIcon : (value : boolean) => void;
}

const CartComponent = ({ cart, title, emptyCart, removeItem, removeSide, showCartIcon} : CartComponentProps) => {
    // const cart = useSelector((state: RootState) => state.cart.items);
    // const dispatch = useDispatch();
    
    const total = cart.reduce((total, menu) => total + (menu.dish?.price ?? 0) + (menu.drink?.price ?? 0) + (menu.sides ? menu.sides.reduce((sidesPrice, side) => sidesPrice + (side.price ?? 0), 0) : 0) ,0);
    
    const onEmptyCart = () => {
        cartIsEmpty(true); 
        showCartIcon(true);
        emptyCart(); 
        setTimeout(()=>navigate("/"),4000);
    };
    
    const navigate = useNavigate(); 
    const [isCartEmpty, cartIsEmpty] = useState(false);
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
                    {title == "Cart" ? <td key={nanoid()} onClick={cart.length == 1 ? ()=>{removeItem("dish", menu.id); onEmptyCart()} : ()=>removeItem("dish", menu.id)} className="trash">🗑️</td> : null}
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                    {menu.sides ? menu.sides.map(side => <tr><td key={nanoid()} className="menu-light">{side.title}</td><td className="menu-light-price" key={nanoid()}>{side.price} kr</td>
                    {title == "Cart" ? <td onClick={()=>removeSide(side, menu.id)} className="trash" key={nanoid()}>🗑️</td> : null}</tr>) : null}
                    
                    {/* <td>{menu.sides?.reduce<number>((acc: Item, curr: Item) => side.price + prev.price)} kr</td> */}
                    
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                <tr>
                    <td className="menu-light" key={nanoid()}>{menu.drink?.title}</td>
                    <td className="menu-light-price" key={nanoid()}>{menu.drink?.price}{menu.drink ? "kr" : null}</td>
                    {(title == "Cart" && menu.drink) ? <td onClick={()=>removeItem("drink", menu.id)} className="trash" key={nanoid()}>🗑️</td> : null}
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                
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