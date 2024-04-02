import { Item } from '../../service/Service'
import './style.css'

type UsingProps = {
    items: Item[] | undefined,
    setCurrentItem: React.Dispatch<Item | undefined>, 
 }


 const trimTitle = (title: string) => {
    const trimmedTitle = title.split(' ').slice(1).join(' ');
    return trimmedTitle;
 }

const ItemSelector = ({items, setCurrentItem} : UsingProps) => {
    return (
        <div>
            {items && 
            Array.isArray(items) && 
            items.map((item: Item) => (
                <button onClick= {() => setCurrentItem(item)} key={item._id}>{trimTitle(item.title)}</button>
            ))}
        </div>
    )
}

export default ItemSelector
  