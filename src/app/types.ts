export interface Product {
    id: number,
    name : string,
    price: number,
    description: string,
    imageUrl: string,
    alcohol: number,
    color: string,
    aroma: string,
    grape: string,
    year: number 
}
export interface cartProduct { 
    quantity: number,
    id: number,
    name : string,
    price: number,
    imageUrl: string,
    color: string,
}
