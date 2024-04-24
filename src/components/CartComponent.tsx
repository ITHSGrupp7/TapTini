import { NavLink, useNavigate } from "react-router-dom";
import { CartItem, Item } from "../service/Service";
import "./CartComponent.css"
import { useEffect } from "react";

type CartComponentProps = {
    setCartItems: () => void;
    cartItems: CartItem[],
    title: string,
    setItem: (item: string) => void;
    removeSide: (item: Item) => void;
    showCartIcon: (value: boolean) => void;
    deleteItem: (nr: number) => void;
    deleteDrink: (nr: number) => void;
    resetItemSelections: () => void;
    deleteSide: (nr1: number, nr2: number) => void;
}

const CartComponent = ({ resetItemSelections, deleteItem, deleteDrink, deleteSide, cartItems, showCartIcon, title, setItem, removeSide, setCartItems }: CartComponentProps) => {
    // const cart = useSelector((state: RootState) => state.cart.items);
    // const dispatch = useDispatch();

    // const sidesPrice: number = cartItem.sides?.reduce((totalPrice, side) => totalPrice + side.price, 0) || 0
    // const total = (cartItem?.dish?.price ?? 0) + (cartItem?.drink?.price ?? 0) + sidesPrice;
    const totalAllList = cartItems.map(item => (item?.dish?.price ?? 0) + (item?.drink?.price ?? 0) + (item?.sides?.reduce((totalPrice, side) => totalPrice + side.price, 0) || 0))
    const totalAll = totalAllList.reduce((a, b) => a + b, 0);
    const navigate = useNavigate();


    useEffect(() => {
        if (title === "Cart")
            setCartItems()
    }, [])



    return cartItems.length > 0 ? <div className="cartTable">
        <h2>{title}</h2>
        <table >
            <thead className="cartTableHead">
                <tr>
                    <th>Categori</th>
                    <th>Item</th>
                    <th>Price</th>
                    {/* {title === "Cart" && <th>Action</th>} */}
                </tr>
            </thead>
            <tbody className="cartTableBody">
                {cartItems.map((item, i) =>
                    <>
                        <tr>
                            <td>Dish</td>
                            <td>{item.dish?.title}</td>
                            <td>{item.dish?.price} kr</td>
                            {title == "Cart" ? <td onClick={() => {
                                // setItem("dish");
                                // setItem("drink");
                                // setItem("sides");
                                // cartIsEmpty(true);
                                // showCartIcon(true);
                                deleteItem(i)
                                // setTimeout(() => navigate("/"), 4000);
                            }} className="trash">🗑️</td> : null}
                        </tr>

                        {item.sides ? item.sides.map((side, j) =>
                            <tr className="sides-row" key={side._id}>
                                <td>🥗 Side</td>
                                <td >{side.title}</td>
                                <td>{side.price} {side ? "kr" : " "} </td>

                                {title == "Cart"
                                    ? <td onClick={() => deleteSide(i, j)} className="trash">🗑️</td>
                                    : null}
                                {/* {title == "Cart"
                                    ? <td onClick={() => removeSide(side)} className="trash">🗑️</td>
                                    : null} */}
                            </tr>)
                            : null}

                        <tr className="sides-row">
                            <td>🍹 Drink</td>
                            <td>{item.drink ? item.drink.title : "Ingen dryck vald"}</td>
                            <td>{item.drink?.price}{item.drink ? "kr" : " "}</td>
                            {(title == "Cart" && item.drink)
                                ? <td onClick={() => deleteDrink(i)} className="trash">🗑️</td>
                                : null}
                            {/* {(title == "Cart" && item.drink)
                                ? <td onClick={() => setItem("drink")} className="trash">🗑️</td>
                                : null} */}
                            {/* cartItems.map((item, itemIndex) => (
                             <td onClick={() => handleDeleteDrink(itemIndex)} className="trash">🗑️</td>
                            ) : null} */}

                        </tr>

                    </>
                )}
                <tr className="cartCost">
                    <td><strong>Total Price:</strong></td>
                    <td colSpan={2} className="cartTotal"><strong>{totalAll} kr</strong></td>
                </tr>
            </tbody>
        </table>
        {(title == "Cart") ? (<NavLink to={`/orderconfirmation`}>
            <button className="navigation-button">BESTÄLL</button>
        </NavLink>) : null}


        {title === "Cart" && <NavLink to="/">
            <button className="navigation-button" onClick={() => { showCartIcon(true); resetItemSelections() }}>LÄGG TILL RÄTT</button>
        </NavLink>
        }

    </div> : <div>
        <p className="redirection-text">Vänligen välj huvudrätt</p>
        <button className="navigation-button" onClick={() => { navigate("/"); showCartIcon(true); resetItemSelections() }}>Fortsätt till start</button>

        {/* <p className="redirection-text" {...setTimeout(() => navigate("/"), 4000)}>Vänligen välj huvudrätt</p> */}
    </div>
};

export default CartComponent