import { useSelector } from "react-redux"
import { RootState } from "../state/store"
import { Item } from "../service/Service";
import "./CartComponent.css"
// import { useDispatch } from 'react-redux';


const CartComponent = (props: { dish: Item, sides: Item, drink: Item }) => {
    // const cart = useSelector((state: RootState) => state.cart.items);
    // const dispatch = useDispatch();

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
                        <td>{props.dish.title}</td>
                        <td>{props.dish.price} kr</td>
                         {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                    </tr>
                    <tr>
                        <td>{props.sides.title}</td>
                        <td>{props.sides.price} kr</td>
                          {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                    </tr>
                    <tr>
                        <td>{props.drink.title}</td>
                        <td>{props.drink.price} kr</td>
                        {/* <td className="cartRemoveItem"><button>remove item</button></td> */}
                    </tr>
                    <tr className="cartCost">
                        <td><strong>Total Price:</strong></td>
                        <td className="cartTotal"><strong>{props.dish.price + props.sides.price + props.drink.price} kr</strong></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

    </div>);
};

export default CartComponent