import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SidesComponent.css';
import { Item } from '../service/Service';

type Side = {
    name: string;
    price: number;
    isSelected?: boolean
};

const sideItems: Side[] = [
    { name: "Aioli", price: 79, isSelected: false },
    { name: "Patatas Bravas", price: 129, isSelected: false },
    { name: "Gazpacho", price: 99, isSelected: false },
    { name: "Albondigas", price: 49, isSelected: false },
    { name: "Marinerade grönsaker", price: 89, isSelected: false },
    { name: "Skaldjur", price: 159, isSelected: false },
];

const SidesComponent = (props: { callback: (item: Item[] | undefined) => void }) => {

    const [items, setItems] = useState<Side[]>(sideItems)

    function onItemClick(index: number): void {
        const newItems: Side[] = items
        newItems[index].isSelected = !newItems[index].isSelected
        setItems([...newItems])
    }

    // const dispatch = useDispatch(); // Initialize useDispatch hook

    // const handleItemClick = (item: Side
    // ) => {
    //     dispatch(addToCart({ // Dispatch addToCart action with selected item data as payload
    //         name: item.name,
    //         price: item.price
    //     }));
    // };

    return (
        <div className='item-selector-wrapper'>
            <div className="item-selector">
                <section className="item-selector__items-group">
                    {
                        items &&
                        Array.isArray(items) &&
                        items.map((item, index) => (
                            <button className={"sidesButton"} key={index} onClick={() => onItemClick(index)}
                                style={{ borderRadius: 8 }}>
                                <span className="item__title">{item.name}</span>
                                <span className="item__title">{item.price}kr</span>
                                <span className="material-symbols-outlined checkmark"
                                    style={{
                                        display: items[index].isSelected ? "inline" : "none"
                                    }}>check_circle</span>
                            </button>
                        ))}
                </section>
            </div>

            <NavLink to="/">
                <button className="navigation-button">TILLBAKA</button>
            </NavLink>

            <NavLink to="/drink">
                <button className="navigation-button" onClick={() => {
                    const selectedItems = items.filter(side => side.isSelected)
                    const sides: Item[] = selectedItems.map(side => {
                        return {
                            _id: items.indexOf(side).toString(),
                            title: side.name,
                            price: side.price,
                        }
                    })

                    props.callback(sides)

                }}>GÅ VIDARE</button>
            </NavLink>
        </div>
    );
};

export default SidesComponent;
