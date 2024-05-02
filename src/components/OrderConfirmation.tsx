import { NavLink, useNavigate, useParams } from "react-router-dom";
import CartComponent from "./CartComponent";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { resetId, setId } from "../state/id/idSlice";
import { addMenu, resetCart } from "../state/cart/cartSlice";
import { RootState } from "../state/store";
import { showCartIcon } from "../state/cartIcon/cartIconSlice";

const returnOrderNumber = () => {
    const cachedOrderNumberString : string | null = localStorage.getItem("ordernumber");
    
    if (cachedOrderNumberString === null) localStorage.setItem("orderNumber", "1");

    const cachedOrderNumber = cachedOrderNumberString ? parseInt(cachedOrderNumberString) : 2;

    const randomQueueProgress = Math.floor(Math.random() * 7)

    const newOrderNumber = cachedOrderNumber + randomQueueProgress + 1;

    localStorage.setItem("ordernumber", newOrderNumber.toString());

    return newOrderNumber;
}

const OrderConfirmation = () => {
    
    
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart)
    const menuId = useSelector((state: RootState) => state.id)
    const cookingTime = cart?.find(_menu => _menu.id === menuId)?.dish?.timeInMins
    const [payment, setPayment] = useState(false);
    const [clicked, setClicked] = useState(false);
    const {total} = useParams<{total: string}>();
    const navigate = useNavigate();

    const resetAll = () => {
        dispatch(resetId());
        dispatch(resetCart());
        dispatch(showCartIcon(true));
    }
    
    const addNewMenu = () => {
        const newId = nanoid();
        dispatch(setId(newId));
        dispatch(addMenu(newId));
        dispatch(showCartIcon(true));
        navigate("/");
    }

    return (
        payment ? (
        <>
            
            <CartComponent title="Kvitto" />
            <h3 style={{marginTop:"1rem"}}>Ditt ordernummer är: {returnOrderNumber()}</h3>

            <h3 style={{margin:"1rem"}}>Din order beräknas ta {cookingTime} minuter</h3>

            <NavLink to="/">
                <button className="navigation-button" onClick={resetAll}>NY BESTÄLLNING</button>
            </NavLink>
        </>
        ) :  (
        <>
            {clicked ? (<><p className="redirection-text">Betalning pågår...</p>
            <div className="paymentAnimation"></div></>) : 
            (<><button className="redirection-button" onClick={()=>{ 
                setClicked(true);
                setTimeout(()=>setPayment(true),4000);
                }}>
                BETALA {total} kr
                </button>
                <p style={{fontWeight:"bolder", fontSize:"1.2rem"}}>ELLER</p>
                <button className="redirection-button" onClick={addNewMenu}>
                    Lägg till fler rätter</button>
                </>)}
                
                </>
                )
    )
}

export default OrderConfirmation