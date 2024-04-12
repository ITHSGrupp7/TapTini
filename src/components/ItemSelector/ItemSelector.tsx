import React from "react";
import { Item } from '../../service/Service'
import './style.css'

type UsingProps = {
    items: Item[] | undefined,
    setCurrentItem: React.Dispatch<Item | undefined>, 
 }


const trimTitle = (title: string) => title.split(' ').slice(1).join(' ');
 

const ItemSelector = ({items, setCurrentItem} : UsingProps) => {

    return (
        <div className="item-selector">
            <h1 className="item-selector__sectionTitle">MENY</h1>
            <section className="item-selector__items-group">
                {items && 
                Array.isArray(items) && 
                items.map((item: Item) => (
                    <button className="item" onClick= {() => setCurrentItem(item)} key={item._id}>
                        <span className="item__icon"></span>
                        <span className="item__title">{item.title}</span>
                    </button>
                ))}
            </section>
        </div>
    )
}

export default ItemSelector
  