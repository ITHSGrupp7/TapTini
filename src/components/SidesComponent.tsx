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

type SideProps = {
    addSides: (item: Item[]) => void
}

function SidesComponent({ addSides }: SideProps) {

    const [items, setItems] = useState<Side[]>(sideItems)

    return (
        <div className='item-selector-wrapper'>
            <div className="item-selector">
                <section className="item-selector__items-group">
                    {
                        items &&
                        Array.isArray(items) &&
                        items.map((item, index) => (
                            <button className={"sidesButton"} key={index} onClick={() => handleOnItemClick(index)}
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
                <button className="navigation-button" onClick={() => handleChooseSelected()}>
                    GÅ VIDARE
                </button>
            </NavLink>
        </div>
    )


    // Event-handlers
    function handleOnItemClick(index: number): void {
        setItems(prevItems => prevItems.map((item, i) => (
            {
                ...item,
                isSelected: i === index ? !item.isSelected : item.isSelected
            })))
    }

    function handleChooseSelected() {
        const selectedItems = items.filter(side => side.isSelected);
        const sides: Item[] = selectedItems.map((side, i) => {
            return {
                _id: i.toString(),
                title: side.name,
                price: side.price,
            };
        });
        addSides(sides);
    }
}

export default SidesComponent;
