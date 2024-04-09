import { ShoppingCart } from "../service/Service"


function TempOutput(props: { cart: ShoppingCart | undefined }) {


    return <>
        <h1>Order from cart</h1>
        <h2>Main dish</h2>
        <ul>
            <li>{props.cart?.mainDish?.title}</li>
            <li>{props.cart?.mainDish?.price} kr</li>
        </ul>
        <h2>Drink</h2>
        <ul>
            <li>{props.cart?.drink?.strDrink}</li>
            <li>{props.cart?.drink?.price} kr</li>
        </ul>
    </>
}

export default TempOutput