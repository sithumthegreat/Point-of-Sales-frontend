import CategoryTypes from "./CategoryTypes";

interface ProductType{
    productId:number,
    name:string,
    expDate:Date,
    qty:number,
    unitPrice:number,
    category?:CategoryTypes


}

export default ProductType;
