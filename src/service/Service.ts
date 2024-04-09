export type Item = {
    _id: string,
    title: string,
    imageUrl?: string,
    description?: string,
    price: number
    quantity?:number
}

export type Drink = {
    strDrink: string;
    strDrinkThumb?: string;
    idDrink: string;
    price: number;
}

export type ShoppingCart = {
    mainDish? : Item;
    addOns? : Item[];
    drink? : Drink;
}

export const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network reponse error");
    }

    return response.json();
}
