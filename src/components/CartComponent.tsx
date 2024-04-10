import { useSelector } from "react-redux"
import { RootState } from "../state/store"
// import { useDispatch } from 'react-redux';


const CartComponent = () => {
    const cart = useSelector((state:RootState) => state.cart.items); 
    // const dispatch = useDispatch();

    return ( <div>
        <h2>Cart</h2>
        <div>
            {cart.map((item, index) => (
                <div key={index}>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    {/* Render other properties of CartItem as needed */}
                </div>
            ))}
        </div>
    </div>);
};

export default CartComponent