import { useEffect, useState } from "react";
import './DrinksComponent.css'
import { NavLink } from "react-router-dom";
import { Item } from "../service/Service";

const trimTitle = (title: string) => title.split(' ').slice(1).join(' ');

export const GetDrinks = (props: { dishName: string | undefined, callback: (item : Item | undefined) => void }) => {

  type Drink = {
    strDrink: string;
    strDrinkThumb: string;
    idDrink: string;
    price: number;
  }

  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined);
  const [showAll, setShowAll] = useState<boolean>(false)

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass")
      .then((res) => res.json())
      .then((data) => {
        let tempList: Drink[] = [data.drinks[5], data.drinks[10], data.drinks[15], data.drinks[45], data.drinks[55], data.drinks[65]]
        let prices: number[] = [119, 99, 115, 125, 135, 85]
        if(tempList.length == prices.length) {
          for(let i = 0; i<tempList.length; i++) {
            tempList[i].price = prices[i]
          }
        } else {
          for(let i = 0; i<tempList.length; i++) {
            tempList[i].price = 135
          }
        }
        setDrinks(tempList)
      })

  }, [])

  const setDrinkSuggestion = (): Drink | undefined => {
    if (drinks != undefined) {
      switch (trimTitle(props.dishName ?? "")) {
        case "Räkor":
          return drinks[3]
        case "Vegansk Jackfruit":
          return drinks[0]
        case "Patatas Bravas":
          return drinks[1]
        case "Tortilla Española":
          return drinks[2]
        case "Champinjoner al Ajillo":
          return drinks[4]
        case "Manchego Ost med Honung och Valnötter":
          return drinks[5]
        default:
          return drinks[0]
      }
    }
  }

  const drinkItem = (drink: Drink) => (
    <div key={drink.idDrink} className="drink-choice">
      <NavLink to="/cart">
        <img className="drink-choise-img" src={drink.strDrinkThumb} onClick={() => props.callback({_id: drink.idDrink, title: drink.strDrink, price: drink.price})} />
      </NavLink>
      <h3 className="drink-choise-text">{drink.strDrink}</h3>
    </div>
  )

  return (
    <>
      {
          
        showAll ?

          <div className="drink-container">
            <h1>Välj din cocktail!</h1>
            {drinks?.map(drink => drinkItem(drink))}
          </div>
          :
          <div className="drink-container">
            <h1>Perfekt cocktail till {props.dishName}:</h1>
            <div className="image-container">
              <a href="#">
                <img src={setDrinkSuggestion()?.strDrinkThumb} />
              </a>
            </div>
            <h2>{setDrinkSuggestion()?.strDrink}</h2>
            <div className="">
              <NavLink to="/cart">
                <button className="navigation-button" onClick={() => props.callback({_id: setDrinkSuggestion()?.idDrink!, title: setDrinkSuggestion()?.strDrink!, price: setDrinkSuggestion()?.price!})}>Välj denna drink</button>
              </NavLink>
              <button className="navigation-button" onClick={() => setShowAll(true)}>Gör ditt egna val</button>
            </div>
          </div>
      }
    </>
  );
}

