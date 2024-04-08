import { useParams } from "react-router-dom"


function TempOutput(props: { dishName: string, drinkName : string }) {

  const {dish, drink} = useParams() as {dish : string, drink : string}  

    return <>
        <h1>Order from props</h1>
        <p>{props.dishName}</p>
        <p>{props.drinkName}</p>
        <h2>Order from useParams</h2>
        <p>{dish}</p>
        <p>{drink}</p>
    </>
}

export default TempOutput