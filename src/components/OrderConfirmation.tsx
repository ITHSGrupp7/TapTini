import { NavLink, useParams } from "react-router-dom";
import CartComponent from "./CartComponent";
import { CartItem } from "../service/Service";
import { useState } from "react";


// function getOrderNumber(): number {
//     let orderNrStorage: string | null = localStorage.getItem('ordernumber')
//     // let ordernumber: number | null = localStorage.getItem('ordernumber')===null ? null : parseInt(localStorage.getItem('ordernumber')!) 
//     let ordernumber: number = 0;
//     if (orderNrStorage === null) {
//         console.log("Order nr is null!")
//         localStorage.setItem("ordernumber", "1");
//         // ordernumber = 1;
//     } else {
//         ordernumber = parseInt(localStorage.getItem('ordernumber')!);
//         ordernumber++;
//         localStorage.setItem("ordernumber", ordernumber.toString());
//     }
//     return ordernumber
// }

const returnOrderNumber = () => {
    const cachedOrderNumberString: string | null = localStorage.getItem("ordernumber");

    if (cachedOrderNumberString === null) localStorage.setItem("orderNumber", "1");

    const cachedOrderNumber = cachedOrderNumberString ? parseInt(cachedOrderNumberString) : 2;
   
    const newOrderNumber = cachedOrderNumber + Math.floor(Math.random() * 7);

    localStorage.setItem("ordernumber", newOrderNumber.toString());

    return newOrderNumber;
}

type OrderConfirmationProps = {
    callback: () => void,
    setCartItems: () => void,
    cartItem: CartItem,
    cartItems: CartItem[],
    showCartIcon: (value: boolean) => void,
    deleteItem: (nr: number) => void
}

const OrderConfirmation = ({ deleteItem, callback, setCartItems, cartItems, showCartIcon }: OrderConfirmationProps) => {

    const [payment, setPayment] = useState(false);
    const [clicked, setClicked] = useState(false);
    const total = cartItems.reduce((acc, item) => acc + item.dish?.price! + (item.drink?.price ?? 0) + item.sides?.reduce((tot, side) => tot + side.price!, 0)!, 0)
    const cookingTime = cartItems.reduce((prevMax, item) => item.dish?.timeInMins! > prevMax ? item.dish?.timeInMins! : prevMax, 0)

    return (
        payment ? (
            <>

                <CartComponent deleteItem={deleteItem} cartItems={cartItems} setCartItems={setCartItems} title="Kvitto" setItem={() => { }} removeSide={() => { }}  />
                <h3 style={{ marginTop: "1rem" }}>Ditt ordernummer är: {returnOrderNumber()}</h3>

                <h3 style={{ margin: "1rem" }}>Din order beräknas ta {cookingTime} minuter</h3>

                <NavLink to="/">
                    <button className="navigation-button" onClick={() => { callback(); showCartIcon(true) }}>NY BESTÄLLNING</button>
                </NavLink>
            </>
        ) : (
            <>
                {clicked ? (<><p className="redirection-text">Betalning pågår...</p><div className="paymentAnimation"></div></>) : (<button className="paymentButton" onClick={() => {
                    setClicked(true);
                    setTimeout(() => setPayment(true), 4000);
                }}>
                    BETALA {total} kr
                </button>)}

            </>
        )
    )
}

export default OrderConfirmation