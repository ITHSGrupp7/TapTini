import { NavLink, useNavigate } from "react-router-dom";
import { Item, Menu } from "../service/Service";
import "./CartComponent.css"
import { useState } from "react";

type CartComponentProps = {
    cart: Menu[],
    initializeCart: () => void;
    removeItem: (item: string, menuId: string) => void;
    removeSide: (side: Item, menuId: string) => void;
}

function CartComponent({ cart, initializeCart, removeItem, removeSide }: CartComponentProps) {
    const [isCartEmpty, setCartIsEmpty] = useState(false);
    const navigate = useNavigate();
    return !isCartEmpty ? <div className="cartTable">
        <h2>Cart</h2>

        <table >
            <thead className="cartTableHead">
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
            </thead>

            {cart ? cart.map(menu =>
                <tbody className="cartTableBody" key={menu.id}>
                    <tr>
                        <td className="menu-bold">{menu.dish?.title}</td>
                        <td className="menu-bold">{menu.dish?.price} kr</td>
                        <td onClick={handleDeleteMainDish(menu)} className="trash">🗑️</td>
                    </tr>
                    {menu.sides?.map(side => (
                        <tr key={side._id}>
                            <td className="menu-light">{side.title}</td>
                            <td className="menu-light-price" >{side.price} kr</td>
                            <td onClick={() => removeSide(side, menu.id)} className="trash" >🗑️</td>
                        </tr>))}

                    <tr>
                        <td className="menu-light" >{menu.drink?.title}</td>
                        <td className="menu-light-price" >{menu.drink?.price}{menu.drink ? "kr" : null}</td>
                        {menu.drink && <td onClick={() => removeItem("drink", menu.id)} className="trash" >🗑️</td>}
                    </tr>
                    <tr><td colSpan={3}><hr /></td></tr>
                </tbody>) : <>{setCartIsEmpty(true)}</>}
            <tbody className="cartTableBody">
                <tr className="cartCost">
                    <td ><strong>Total Price:</strong></td>
                    <td colSpan={2} className="cart-total" ><strong>{total()} kr</strong></td>
                </tr>
            </tbody>
        </table>

        <NavLink to={`/orderconfirmation/${total()}`}>
            <button className="navigation-button">BESTÄLL</button>
        </NavLink>

    </div> : <p className="redirection-text">Vänligen välj huvudrätt</p>


    // Event-handlers
    function onEmptyCart() {
        setCartIsEmpty(true);
        initializeCart();
        setTimeout(() => navigate("/"), 4000);
    }

    function handleDeleteMainDish(menu: Menu) {
        return cart.length == 1 ? () => { removeItem("dish", menu.id); onEmptyCart(); } : () => removeItem("dish", menu.id);
    }
    
    // Helper-methods
    function total() {
        let sum = 0;
        cart.forEach(menu => {
            sum += menu.dish?.price ?? 0
            menu.sides?.forEach(side => {
                sum += side.price
            })
            sum += menu.drink?.price ?? 0
        })
        return sum
    }

}

export default CartComponent