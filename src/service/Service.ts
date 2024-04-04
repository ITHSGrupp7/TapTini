export type Item = {
    _id: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}

export const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network reponse error");
    }

    return response.json();
}
