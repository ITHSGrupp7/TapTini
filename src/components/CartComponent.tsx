// import { useSelector } from "react-redux"
// import { RootState } from "../state/store"
import { NavLink } from "react-router-dom";
import { CartItem } from "../service/Service";
import "./CartComponent.css"
// import { useDispatch } from 'react-redux';

type CartComponentProps = {
    cartItem : CartItem,
    title : string
}

const CartComponent = ({ cartItem, title} : CartComponentProps) => {
    // const cart = useSelector((state: RootState) => state.cart.items);
    // const dispatch = useDispatch();

    const sidesPrice: number = cartItem.sides?.reduce((totalPrice, side) => totalPrice + side.price, 0) || 0
    const total = (cartItem?.dish?.price ?? 0) + (cartItem?.drink?.price ?? 0) + sidesPrice;

    return <div className="cartTable">
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
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                <tr>
                    <td>{cartItem.sides ? cartItem.sides.map(side => <p key={side._id}>{side.title}</p>) : null}
                    </td>
                    {/* <td>{cartItem.sides?.reduce<number>((acc: Item, curr: Item) => side.price + prev.price)} kr</td> */}
                    <td>{sidesPrice} kr</td>
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                <tr>
                    <td>{cartItem.drink?.title}</td>
                    <td>{cartItem.drink?.price} kr</td>
                    {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                </tr>
                <tr className="cartCost">
                    <td><strong>Total Price:</strong></td>
                    <td className="cartTotal"><strong>{total} kr</strong></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        {(title == "Cart") ? (<NavLink to={`/orderconfirmation/${total}`}>
                <button className="navigation-button">BESTÄLL</button>
        </NavLink>) : null}

    </div>
};

export default CartComponent