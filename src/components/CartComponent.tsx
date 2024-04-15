// import { useSelector } from "react-redux"
// import { RootState } from "../state/store"
import { NavLink } from "react-router-dom";
import { CartItem } from "../service/Service";
import "./CartComponent.css"
// import { useDispatch } from 'react-redux';


const CartComponent = (props: { cartItem: CartItem }) => {
    // const cart = useSelector((state: RootState) => state.cart.items);
    // const dispatch = useDispatch();

    const sidesPrice: number = props.cartItem.sides?.reduce((totalPrice, side) => totalPrice + side.price, 0) || 0


    return (<div className="cartTable">
        <h2>Cart</h2>

        <table >
            <thead className="cartTableHead">
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody className="cartTableBody">
                <tr>
                    <td>{props.cartItem.dish?.title}</td>
                    <td>{props.cartItem.dish?.price} kr</td>
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                <tr>
                    <td>{props.cartItem.sides ? props.cartItem.sides.map(side => <p key={side._id}>{side.title}</p>) : null}
                    </td>
                    {/* <td>{props.cartItem.sides?.reduce<number>((acc: Item, curr: Item) => side.price + prev.price)} kr</td> */}
                    <td>{sidesPrice} kr</td>
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                <tr>
                    <td>{props.cartItem.drink?.title}</td>
                    <td>{props.cartItem.drink?.price} kr</td>
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                <tr className="cartCost">
                    <td><strong>Total Price:</strong></td>
                    <td className="cartTotal"><strong>{(props.cartItem?.dish?.price ?? 0) + (props.cartItem?.drink?.price ?? 0) + sidesPrice} kr</strong></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        <NavLink to="/orderconfirmation">
                <button className="navigation-button">BESTÄLL</button>
        </NavLink>

    </div>);
};

export default CartComponent