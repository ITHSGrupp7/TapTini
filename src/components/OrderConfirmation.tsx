import { NavLink } from "react-router-dom";


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

const OrderConfirmation = (props: { cookingTime : number | undefined, callback: () => void }) => {
    return (
        <div>
            <h3>Ditt ordernummer är: {returnOrderNumber()}</h3>

            <h3>Din order beräknas ta {props.cookingTime} minuter</h3>

            <NavLink to="/">
                <button className="navigation-button" onClick={props.callback}>NY BESTÄLLNING</button>
            </NavLink>
        </div>
    )
}

export default OrderConfirmation