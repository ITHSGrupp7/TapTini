import { Item } from "../../service/Service"
import './style.css'

type UsingProps = {
    currentItem: Item | undefined,
}

const trimTitle = (title: string) => title.split(' ').slice(1).join(' ');

const ItemDisplayer = ({currentItem} : UsingProps) => {
    const renderThis = !currentItem ? <></> 
    :   <div className="item-displayer">
            
            {/* section title */}
            <div className="item-displayer__section-title">
                <div><h1>VÄLJ DIN HUVUDRÄTT</h1></div>
                <div className="item-displayer__basket"><a href="#"></a></div>
            </div>

            <div className="item-displayer__item">

                {/* info block */}
                <div className="item-displayer__item-info">
                    <div className="item-info__title">
                        <h1>
                            {trimTitle(currentItem.title)}
                            <span className="item-info__price">199 SEK</span>
                        </h1>
                        <p>{currentItem.description}</p>
                    </div>
                </div>
                
                {/* our image */}
                <img src={currentItem.imageUrl} alt="Huvudrätt" width="500px" />
            </div>
            <button className="continue-button">GÅ VIDARE</button>
        </div>
    
    return (
        renderThis
    )
}

export default ItemDisplayer