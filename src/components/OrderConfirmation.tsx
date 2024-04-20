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
    const cachedOrderNumberString : string | null = localStorage.getItem("ordernumber");
    
    if (cachedOrderNumberString === null) localStorage.setItem("orderNumber", "1");

    const cachedOrderNumber = cachedOrderNumberString ? parseInt(cachedOrderNumberString) : 2;

    const randomQueueProgress = Math.floor(Math.random() * 7)

    const newOrderNumber = cachedOrderNumber + randomQueueProgress + 1;

    localStorage.setItem("ordernumber", newOrderNumber.toString());

    return newOrderNumber;
}

type OrderConfirmationProps = {
    cookingTime : number | undefined,
    callback: () => void,
    cartItem : CartItem
}

const OrderConfirmation = ({ cookingTime, callback, cartItem} : OrderConfirmationProps) => {

    const [payment, setPayment] = useState(false);
    const [clicked, setClicked] = useState(false);
    const {total} = useParams<{total: string}>();

    return (
        payment ? (<div>
            
            <CartComponent cartItem={cartItem} title="Kvitto"/>
            <h3 style={{marginTop:"1rem"}}>Ditt ordernummer är: {returnOrderNumber()}</h3>

            <h3>Din order beräknas ta {cookingTime} minuter</h3>

            <NavLink to="/">
                <button className="navigation-button" onClick={callback}>NY BESTÄLLNING</button>
            </NavLink>
        </div>) :  (
        <>
            {clicked ? (<><p className="ongoingPayment">Betalning pågår...</p><div className="paymentAnimation"></div></>) : (<button className="paymentButton" onClick={()=>{
                setClicked(true);
                setTimeout(()=>setPayment(true),4000)
                }}>
                BETALA {total} kr
                </button>)}
                
                </>
                )
    )
}

export default OrderConfirmation