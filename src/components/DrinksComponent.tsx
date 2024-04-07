import { useEffect, useState } from "react";
import './DrinksComponent.css'

export const GetDrinks = (props: { dishName: number }) => {

  type Drink = {
    strDrink: string;
    strDrinkThumb: string;
    idDrink: string;
  }
  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined);
  const [showAll, setShowAll] = useState<boolean>(false)

  // Räkor

  // Vegansk Jackfruit
  
  // Patatas Bravas
  
  // Tortilla Española
  
  // Champinjoner al Ajillo
  
  // Manchego Ost med Honung och Valnötter

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass")
      .then((res) => res.json())
      .then((data) => {
        let tempList: Drink[] = [data.drinks[5], data.drinks[10], data.drinks[15], data.drinks[55], data.drinks[65]]
        console.log(tempList)
        setDrinks(tempList)
      })

  }, [])

  const setDrinkSuggestion = (): Drink | undefined => {
    if (drinks != undefined) {
      if (props.dishName < 0 || props.dishName >= drinks.length) {
        return drinks[0]
      } else if (props.dishName === 1) {
        return drinks[3]
      }
    }
  }

  const drinkItem = (drink: Drink) => (
    <div key={drink.idDrink} className="drink-choice">
      <img className="drink-choise-img" src={drink.strDrinkThumb} onClick={() => console.log(drink.strDrink)}/>
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
            <h1>Perfekt cocktail till ditt val:</h1>
            <div className="image-container">
              <a href="#">
                <img src={setDrinkSuggestion()?.strDrinkThumb} />
              </a>
            </div>
            {/* {drinks?.map(drink => <div key={drink.idDrink}><p>{drink?.strDrink}</p><img src={drink?.strDrinkThumb}/></div>)} */}
            <h2>{setDrinkSuggestion()?.strDrink}</h2>
            <div className="btn-container">
              <button className="drink-btn">Välj denna drink</button>
              <button className="drink-btn" onClick={() => setShowAll(true)}>Gör ditt egna val</button>
            </div>
          </div>
      }
    </>
  );
}

