import { useEffect, useState } from 'react';
import { Item, fetchData } from '../../service/Service';
import ItemSelector from '../../components/ItemSelector/ItemSelector';
import ItemDisplayer from '../../components/ItemDisplayer/ItemDisplayer';
import './style.css'

const trimTitle = (title: string) => title.split(' ').slice(1).join(' ');

const Homepage = (props: {callback: (item : Item | undefined) => void}) => {
    const [items, setItems] = useState<Item[] | undefined>(undefined);
    const [currentItem, setCurrentItem] = useState<Item>();

    useEffect(() => {
        try {
            const itemsData = fetchData("https://iths-2024-recept-grupp7-86oop6.reky.se/recipes");

            itemsData.then((data: Item[]) => {
                const trimmedItems = data.map((item: Item) => {
                    return { ...item, title: trimTitle(item.title) }
                })
                setItems(trimmedItems);
                setCurrentItem(trimmedItems[0])
            })
        } catch (error) {
            console.error("Network error response");
        }
    }, [])

    return (
        <main className="content-wrapper">
            <ItemSelector items={items} setCurrentItem={setCurrentItem} />
            <ItemDisplayer currentItem={currentItem} callback={props.callback} />
        </main>
    )
}

export default Homepage