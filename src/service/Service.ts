export type Item = {
    _id: string,
    title: string,
    imageUrl?: string,
    timeInMins?: number,
    description?: string,
    price: number,
    quantity?: number
}

export type CartItem = {
    dish?: Item,
    sides?: Item[],
    drink?: Item,
}

export const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network reponse error");
    }

    return response.json();
}
