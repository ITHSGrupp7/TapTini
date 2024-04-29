import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Menu } from "../service/Service";
import { useState, useEffect } from "react";
import "./CartComponent.css"

type OrderConfirmationProps = {
    cart: Menu[],
    cookingTime: number | undefined,
    initializeCart: () => void,
    addMenu: () => void,
}

const OrderConfirmation = ({ cookingTime, cart, addMenu, initializeCart }: OrderConfirmationProps) => {

    const [payment, setPayment] = useState(false);
    const [clicked, setClicked] = useState(false);
    const { total } = useParams<{ total: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (clicked) {
            setTimeout(() => setPayment(true), 4000);
        }
    }, [clicked])

    return (
        payment ? (
            <>
                <div className="cartTable">
                    <h2>Kvitto</h2>

                    <table >
                        <thead className="cartTableHead">
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        {cart && cart.map(menu =>
                            <tbody key={menu.dish?._id} className="cartTableBody">
                                <tr>
                                    <td className="menu-bold">{menu.dish?.title}</td>
                                    <td className="menu-bold">{menu.dish?.price} kr</td>
                                </tr>
                                {menu.sides?.map(side => <tr key={side._id}>
                                    <td className="menu-light">
                                        {side.title}
                                    </td>
                                    <td className="menu-light-price">
                                        {side.price} kr
                                    </td>
                                </tr>)}

                                <tr>
                                    <td className="menu-light" >{menu.drink?.title}</td>
                                    <td className="menu-light-price" >{menu.drink?.price}{menu.drink ? "kr" : null}</td>
                                </tr>
                                <tr><td colSpan={3}><hr /></td></tr>
                            </tbody>)}
                        <tbody className="cartTableBody">
                            <tr className="cartCost">
                                <td ><strong>Total Price:</strong></td>
                                <td colSpan={2} className="cart-total" ><strong>{total} kr</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 style={{ marginTop: "1rem" }}>Ditt ordernummer är: {returnOrderNumber()}</h3>
                <h3 style={{ margin: "1rem" }}>Din order beräknas ta {cookingTime} minuter</h3>
                <NavLink to="/">
                    <button className="navigation-button" onClick={() => { initializeCart() }}>
                        NY BESTÄLLNING
                    </button>
                </NavLink>
            </>
        ) : (
            <>
                {clicked ? (
                    <>
                        <p className="redirection-text">
                            Betalning pågår...
                        </p>
                        <div className="paymentAnimation" />
                    </>)
                    :
                    (
                        <>
                            <button className="redirection-button" onClick={() => setClicked(true)}>
                                BETALA {total} kr
                            </button>
                            <p style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>
                                ELLER
                            </p>
                            <button className="redirection-button" onClick={() => handleAddMoreToOrder()}>
                                Lägg till fler rätter
                            </button>
                        </>)}
            </>
        )
    )

    // Event-handlers
    function handleAddMoreToOrder() {
        navigate("/")
        addMenu()
    }

    // Helper-functions
    function returnOrderNumber() {
        const cachedOrderNumberString: string | null = localStorage.getItem("ordernumber");
        if (cachedOrderNumberString === null) localStorage.setItem("orderNumber", "1");
        const cachedOrderNumber = cachedOrderNumberString ? parseInt(cachedOrderNumberString) : 2;
        const randomQueueProgress = Math.floor(Math.random() * 7)
        const newOrderNumber = cachedOrderNumber + randomQueueProgress + 1;
        localStorage.setItem("ordernumber", newOrderNumber.toString());
        return newOrderNumber;
    }


}

export default OrderConfirmation