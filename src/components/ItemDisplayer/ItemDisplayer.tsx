import { NavLink } from "react-router-dom";
import { Item } from "../../service/Service"
import './style.css'

type UsingProps = {
    currentItem: Item | undefined,
    callback: any
}

const trimTitle = (title: string) => title.split(' ').slice(1).join(' ');

const ItemDisplayer = ({ currentItem, callback }: UsingProps) => {
    const renderThis = !currentItem ? <></>
        : <div className="item-displayer">

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
                            <span className="item-info__price">{currentItem.price} SEK</span>
                        </h1>
                        <p>{currentItem.description}</p>
                    </div>
                </div>

                {/* our image */}
                <img src={currentItem.imageUrl} alt="Huvudrätt" width="500px" />
            </div>
            <NavLink to="/drink">
                <button className="continue-button" onClick={() => callback(currentItem)}>GÅ VIDARE</button>
            </NavLink>
        </div>

    return (
        renderThis
    )
}

export default ItemDisplayer