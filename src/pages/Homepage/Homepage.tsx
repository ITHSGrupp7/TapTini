import { useEffect, useState } from 'react';
import { Item, fetchData } from '../../service/Service';
import ItemSelector from '../../components/ItemSelector/ItemSelector';
import ItemDisplayer from '../../components/ItemDisplayer/ItemDisplayer';
import './style.css'


const Homepage = ({callback} : any) => {
    const [items, setItems] = useState<Item[] | undefined>(undefined);
    const [currentItem, setCurrentItem] = useState<Item>();

    useEffect(() => {
        try {
            // try fetching data, we call our fetchData function
            const itemsData = fetchData("https://iths-2024-recept-grupp7-86oop6.reky.se/recipes");

            itemsData.then((data : Item[]) => {
                setItems(data);
                setCurrentItem(data[0])
            })
        } catch(error) {
            console.error("Network error response");
        }
    }, [])

    return (
        <main className="content-wrapper">
            <ItemSelector items={items} setCurrentItem={setCurrentItem} />
            <ItemDisplayer currentItem={currentItem} callback={callback}/>
        </main>
    )
}

export default Homepage