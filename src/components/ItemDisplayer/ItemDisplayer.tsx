import { Item } from "../../service/Service"
import './style.css'

type UsingProps = {
    currentItem: Item | undefined,
}

const ItemDisplayer = ({currentItem} : UsingProps) => {
    const renderThis = !currentItem ? <></> 
        :   <div>
                <img src={currentItem.imageUrl}></img>
                <p>{currentItem.title}</p>
                <p>{currentItem.description}</p>
        </div>
        
    return (
        renderThis
    )
}

export default ItemDisplayer