import { useEffect, useState } from "react";
import './DrinksComponent.css'
import { NavLink, useParams } from "react-router-dom";

export const GetDrinks = (props: { dishName: string, callback: any }) => {

  type Drink = {
    strDrink: string;
    strDrinkThumb: string;
    idDrink: string;
  }
  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined);
  const [showAll, setShowAll] = useState<boolean>(false)

  const {name} = useParams() as {name : string}  

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass")
      .then((res) => res.json())
      .then((data) => {
        let tempList: Drink[] = [data.drinks[5], data.drinks[10], data.drinks[15], data.drinks[45], data.drinks[55], data.drinks[65]]
        setDrinks(tempList)
      })

  }, [])

  const setDrinkSuggestion = (): Drink | undefined => {
    if (drinks != undefined) {
      switch (props.dishName) {
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
      <NavLink to="/tempoutput">
        <img className="drink-choise-img" src={drink.strDrinkThumb} onClick={() => props.callback(drink.strDrink)} />
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
            <h1>Perfekt cocktail till {name}:</h1>
            <div className="image-container">
              <a href="#">
                <img src={setDrinkSuggestion()?.strDrinkThumb} />
              </a>
            </div>
            <h2>{setDrinkSuggestion()?.strDrink}</h2>
            <div className="btn-container">
              <NavLink to="/tempoutput">
                <button className="drink-btn" onClick={() => props.callback(setDrinkSuggestion()?.strDrink)}>Välj denna drink</button>
              </NavLink>
              <button className="drink-btn" onClick={() => setShowAll(true)}>Gör ditt egna val</button>
            </div>
          </div>
      }
    </>
  );
}

