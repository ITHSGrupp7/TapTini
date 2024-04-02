import { Item } from '../../service/Service'
import './style.css'

// Homepage
// const [items, setItems] = useState<Item[] | undefined>(undefined);

// items hamtas av ItemSelector, ItemDisplayer 

type UsingProps = {
    items: Item[] | undefined,
    setCurrentItems: React.Dispatch<Item | undefined>, 
 }


 const trimTitle = (title: string) => {
    const trimmedTitle = title.split(' ').slice(1).join(' ');
    return trimmedTitle;
 }

const ItemSelector = ({items, setCurrentItems} : UsingProps) => {
    return (
        <div>
            {items && 
            Array.isArray(items) && 
            items.map((item: Item) => (
                <button onClick= {() => setCurrentItems(item)} key={item._id}>{trimTitle(item.title)}</button>
            ))}
        </div>
    )
}

export default ItemSelector
  