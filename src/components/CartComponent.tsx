// import { useSelector } from "react-redux"
// import { RootState } from "../state/store"
import { CartItem, Item } from "../service/Service";
import "./CartComponent.css"
// import { useDispatch } from 'react-redux';


const CartComponent = (props: { cartItem: CartItem }) => {
    // const cart = useSelector((state: RootState) => state.cart.items);
    // const dispatch = useDispatch();

    const sidesPrice: number = props.cartItem.sides?.reduce((totalPrice, side) => totalPrice + side.price, 0) || 0

    return (<div className="cartTable">
        <h2>Cart</h2>
        <div>
            {/* <p>{props.dish.title}</p>
            <p>{props.sides.title}</p>
            <p>{props.drink.title}</p> */}
            {/* {cart.map((item, index) => (
                <div key={index}>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    Render other properties of CartItem as needed
                </div>
            ))} */}
        </div>
        {/* <h3>Totalpris:</h3>
        <p>{props.dish.price + props.sides.price + props.drink.price} kr</p> */}


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
                    <td>{props.cartItem.sides ? props.cartItem.sides.map(side => <p>{side.title}</p>) : null}
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

    </div>);
};

export default CartComponent