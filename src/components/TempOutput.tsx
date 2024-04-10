import { useParams } from "react-router-dom"


function TempOutput(props: { dishName: string, sidesName: string, drinkName : string }) {


    return <>
        <h1>Order from props</h1>
        <p>{props.dishName}</p>
        <p>{props.sidesName}</p>
        <p>{props.drinkName}</p>
    </>
}

export default TempOutput