import { useEffect, useState } from 'react';
import { Item, fetchData } from '../../service/Service';
import ItemSelector from '../../components/ItemSelector/ItemSelector';
import './style.css'

const Homepage = () => {
    const [items, setItems] = useState<Item[] | undefined>(undefined);
    const [currentItem, setCurrentItem] = useState<Item>();

    useEffect(() => {
        try {
            // try fetching data, we call our fetchData function
            const itemsData = fetchData("https://iths-2024-recept-grupp7-86oop6.reky.se/recipes");

            itemsData.then((data : Item[]) => {
                setItems(data);
            })
        } catch(error) {
            console.error("Network error response");
        }
    })

    return (
        <div>
            <h2>Homepage</h2>
            <ItemSelector items={items} setCurrentItem={setCurrentItem} />

            <h1>Active: {currentItem?.title}</h1>
        </div>
    )
}

export default Homepage