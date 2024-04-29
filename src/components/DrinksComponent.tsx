import { useEffect, useState } from "react";

import './DrinksComponent.css'
import { NavLink } from "react-router-dom";
import { Item } from "../service/Service";

type DrinkProps = {
  chooseDrink: (item: Item) => void;
  dishName: string | undefined
}

export function GetDrinks({ dishName, chooseDrink }: DrinkProps) {

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
        const tempList: Drink[] = [data.drinks[5], data.drinks[10], data.drinks[15], data.drinks[45], data.drinks[55], data.drinks[65]]
        const prices: number[] = [119, 99, 115, 125, 135, 85]
        if (tempList.length == prices.length) {
          for (let i = 0; i < tempList.length; i++) {
            tempList[i].price = prices[i]
          }
        } else {
          for (let i = 0; i < tempList.length; i++) {
            tempList[i].price = 135
          }
        }
        setDrinks(tempList)
      })

  }, [])

  return (
    <>
      {

        showAll ?
          <div className="drinks-wrapper">
            <h1>Välj din cocktail!</h1>
            <div className="productlist__wrapper">
              <div className="product__list">
                {drinks?.map(drink => drinkItem(drink))}
              </div>
            </div>
          </div>
          :
          <article style={{ '--isRecommended': 'true' } as React.CSSProperties}>
            <div className="product">
              <header className="product__art">
                <img src={setDrinkSuggestion()?.strDrinkThumb} />
              </header>
              <h2 className="product__title">
                Perfekt cocktail till {dishName}
              </h2>
              <div className="product__infos">

                <NavLink to="/cart">
                  <button className="navigation-button" onClick={() => handleClickSuggestedDrink()}>
                    Välj denna drink
                  </button>
                </NavLink>
                <button className="navigation-button" onClick={() => setShowAll(true)}>
                  Gör ditt egna val
                </button>
                <NavLink to="/cart">
                  <button className="navigation-button">
                    Fortsätt utan drink
                  </button>
                </NavLink>

              </div>
            </div>
          </article>
      }
    </>
  );

  // Event-handlers
  function handleClickSuggestedDrink() {
    chooseDrink({
      _id: setDrinkSuggestion()!.idDrink,
      title: setDrinkSuggestion()!.strDrink,
      price: setDrinkSuggestion()!.price
    })
  }

  // Helper-functions
  function setDrinkSuggestion(): Drink | undefined {

    if (drinks !== undefined) {
      switch (dishName) {
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

  function drinkItem(drink: Drink) {
    return (
      <div key={drink.idDrink} className="drink-choice">
        <NavLink to="/cart">
          <img className="drink-choise-img" src={drink.strDrinkThumb} onClick={() => {
            chooseDrink({ _id: drink.idDrink, title: drink.strDrink, price: drink.price })
          }} />
        </NavLink>
        <h3 className="drink-choise-text">{drink.strDrink}</h3>
      </div>
    )
  }
}

