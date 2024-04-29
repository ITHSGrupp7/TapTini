import { NavLink } from "react-router-dom";
import { Item} from "../../service/Service"
import './style.css'

type ItemProps = {
    currentItem: Item | undefined;
    addDish: (item : Item) => void
}

const ItemDisplayer = ({ currentItem, addDish}: ItemProps) => {
    const renderThis = !currentItem ? <></>
        : <div className="item-displayer">

            {/* section title */}
            <div className="item-displayer__section-title">
                <div><h1>VÄLJ DIN HUVUDRÄTT</h1></div>
                {/* <div className="item-displayer__basket"><a href="/cart"></a></div> */}
            </div>

            <div className="item-displayer__item">

                {/* info block */}
                <div className="item-displayer__item-info">
                    <div className="item-info__title">
                        <h1>
                            {currentItem.title}
                            <span className="item-info__price">{currentItem.price} SEK</span>
                        </h1>
                        <p>{currentItem.description}</p>
                    </div>
                </div>

                {/* our image */}
                <img src={currentItem.imageUrl} alt="Huvudrätt" width="500px" />
            </div>
            <NavLink to="/sides">
                <button className="navigation-button" onClick={() => addDish(currentItem)}>GÅ VIDARE</button>
            </NavLink>
        </div>

    return (
        renderThis
    )
}

export default ItemDisplayer