// import { useSelector } from "react-redux"
// import { RootState } from "../state/store"
import { NavLink, useNavigate } from "react-router-dom";
import { CartItem, Item } from "../service/Service";
import "./CartComponent.css"
import { useState } from "react";
// import { useDispatch } from 'react-redux';

type CartComponentProps = {
    cartItem : CartItem,
    title : string,
    setItem : (item : string) => void;
    removeSide : (item : Item) => void;
    showCartIcon : (value : boolean) => void;
}

const CartComponent = ({ cartItem, title, setItem, removeSide, showCartIcon} : CartComponentProps) => {
    // const cart = useSelector((state: RootState) => state.cart.items);
    // const dispatch = useDispatch();

    const sidesPrice: number = cartItem.sides?.reduce((totalPrice, side) => totalPrice + side.price, 0) || 0
    const total = (cartItem?.dish?.price ?? 0) + (cartItem?.drink?.price ?? 0) + sidesPrice;
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
                <tr>
                    <td>{cartItem.dish?.title}</td>
                    <td>{cartItem.dish?.price} kr</td>
                    {title == "Cart" ? <td onClick={()=>{setItem("dish"); setItem("drink"); setItem("sides"); cartIsEmpty(true); showCartIcon(true); setTimeout(()=>navigate("/"),4000);}} className="trash">🗑️</td> : null}
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                    {cartItem.sides ? cartItem.sides.map(side => <tr><td key={side._id}>{side.title}</td><td>{side.price} kr</td>
                    {title == "Cart" ? <td onClick={()=>removeSide(side)} className="trash">🗑️</td> : null}</tr>) : null}
                    
                    {/* <td>{cartItem.sides?.reduce<number>((acc: Item, curr: Item) => side.price + prev.price)} kr</td> */}
                    
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                <tr>
                </tr>
                <tr>
                    <td>{cartItem.drink?.title}</td>
                    <td>{cartItem.drink?.price}{cartItem.drink ? "kr" : null}</td>
                    {(title == "Cart" && cartItem.drink) ? <td onClick={()=>setItem("drink")} className="trash">🗑️</td> : null}
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                <tr className="cartCost">
                    <td><strong>Total Price:</strong></td>
                    <td colSpan={2} className="cartTotal"><strong>{total} kr</strong></td>
                </tr>
            </tbody>
        </table>

        {(title == "Cart") ? (<NavLink to={`/orderconfirmation/${total}`}>
                <button className="navigation-button">BESTÄLL</button>
        </NavLink>) : null}

    </div> : <p className="redirection-text">Vänligen välj huvudrätt</p>
};

export default CartComponent