import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addToCart } from '../state/cart/cartSlice';
import styles from './SidesComponent.module.css';
import ItemSelector from './ItemSelector/ItemSelector';
import { Item } from '../service/Service';

type Side = {
    name: string;
    price: number;
};

const sideItems: Side[] = [
    { name: "Aioli", price: 79 },
    { name: "Patatas Bravas", price: 129 },
    { name: "Gazpacho", price: 99 },
    { name: "Albondigas", price: 49 },
    { name: "Marinerade grönsaker", price: 89 },
    { name: "Skaldjur", price: 159 },
];


// interface Props {
//     sideItems: Sides[];
//     callback: (name: string) => void; // Define callback prop
// }

const SidesComponent = (props: { callback: any }) => {
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const handleItemClick = (item: Side
    ) => {
        dispatch(addToCart({ // Dispatch addToCart action with selected item data as payload
            name: item.name,
            price: item.price
        }));
    };

    // export type Item = {
    //     _id: string,
    //     title: string,
    //     imageUrl?: string,
    //     description?: string,
    //     price: number,
    //     quantity?: number
    // }

    return (
        <div>
            {/* <ItemSelector items={sideItems}  /> */}
            <div className="item-selector">
                <section className="item-selector__items-group">
                    {sideItems &&
                        Array.isArray(sideItems) &&
                        sideItems.map((item, index) => (
                            // <button className={styles.sidesButton} key={index} onClick={() => handleItemClick(item)}>
                            <NavLink to="/drink" className={styles["navlink-item"]}>
                                <button className={styles.sidesButton} key={index} onClick={() => props
                                    .callback({ _id: index, title: item.name, price: item.price})}>
                                    <span className="item__title">{item.name}</span>
                                    <span className="item__title">{item.price}kr</span>
                                </button>
                            </NavLink>
                        ))}
                </section>
            </div>

            <NavLink to="/">
                <button className="navigation-button">TILLBAKA</button>
            </NavLink>

            {/* <NavLink to="/drink">
                <button className="navigation-button">GÅ VIDARE</button>
            </NavLink> */}
        </div>
    );
};

export default SidesComponent;
