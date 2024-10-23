import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import CategoryTypes from "../types/CategoryTypes";
import { useAuth } from "../context/AuthContext";

function Products(){
    const {isAuthenticated,jwtToken}=useAuth();
    const [products,setProducts]=useState<ProductType[]>([]);
    const[categories,setCategories]=useState<CategoryTypes[]>([]);
    const[productName,setProductName]=useState<string>("");
    const[expDate,setExpDate]=useState<Date | null>(null);
    const[qty,setQty]=useState<number>(0);
    const[unitprice,setUnitPrice]=useState<number>(0.0);
    const[catId,setCatId]=useState<number>();
    const[productId,setProductId]=useState<number>();
    const[deleteMode,setDeleteMode]=useState<boolean>(false);
    const[editMode,setEditMode]=useState<boolean>(false);

    const config={
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
    }

    async function loadProducts() {
        const apiResponse=await axios.get("http://localhost:8081/product",config);
        setProducts(apiResponse.data);
        
    }

    async function loadCategories(){
        const apiResponse=await axios.get("http://localhost:8081/category",config);
        setCategories(apiResponse.data);
    }

    function handelProductName(event:any){
        setProductName(event.target.value);
    }

    function handelExpDate(event:React.ChangeEvent<HTMLInputElement>){
        const selectedDate=event.target.value?new Date(event.target.value):null;
        setExpDate(selectedDate);

    }

    function handelQuantity(event:any){
        setQty(event.target.value);

    }

    function handelUnitPrice(event:any){
        setUnitPrice(event.target.value);


    }
    function handelCatId(event:any){
        setCatId(event.target.value);


    }
    function handelEdit(product:ProductType){
        setEditMode(true);
        setProductName(product.name);
        const selectedDate=new Date(product.expDate);
        setExpDate(selectedDate);
        setQty(product.qty);
        setUnitPrice(product.unitPrice);
        setProductId(product.productId);
        setCatId(product.category?.catId);

    }

    function handleDelete(product:ProductType){
        setDeleteMode(true);
        setProductName(product.name);
        const selectedDate=new Date(product.expDate);
        setExpDate(selectedDate);
        setQty(product.qty);
        setUnitPrice(product.unitPrice);
        setProductId(product.productId);
        setCatId(product.category?.catId);

    }

    async function handelSubmit(){
        event?.preventDefault();
        console.log("submit button click");
        const data={
            name:productName,
            expDate:expDate,
            qty:qty,
            unitPrice:unitprice,
            catId:catId
        }
        try {
            if(editMode && productId!=null ){
                console.log("Update Starting");
                await axios.put(`http://localhost:8081/product/${productId}`,data,config);
                await loadProducts();
            }else if(deleteMode){
                console.log("Deleting Starting");
                await axios.delete(`http://localhost:8081/product/${productId}`,config);
                await loadProducts();
            }
            else{
                console.log("success");
                await axios.post("http://localhost:8081/product",data,config);
                await loadProducts();

            }
          
        } catch (error) {
            console.log(error);
        }
        setEditMode(false);
        setDeleteMode(false);
        setProductName("");
        setExpDate(null);
        setQty(0);
        setUnitPrice(0);
        setCatId(undefined);
        setProductId(undefined);
        
    }

    useEffect (function(){
        if(isAuthenticated){
            loadProducts();
            loadCategories();

        }
        
    },[isAuthenticated])
    return(
        <>
            <div className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 w-[450px] p-4 rounded-lg shadow-lg ml-3">
                <p className="text-white text-4xl font-semibold text-left">Point Of Sales</p>
            </div>
            <div className="flex mt-8 ml-3 space-x-8">
                <div className="container max-w-[75%] p-4 bg-white rounded-lg shadow-md">
                    <p className="text-grey-700 text-2xl font-bold mb-4">Product List</p>
                    <table className="min-w-full table-auto text-sm text-left text-gray-600 shadow-md">
                        <thead className="bg-grey-200 text-grey-700 uppercase text-sm">
                            <tr>
                                <th scope="col" className="px-6 py-3 border-b-2 border-grey-300 w-1/4">Product ID</th>
                                <th scope="col" className="px-6 py-3 border-b-2 border-grey-300 w-1/4">Product Name</th>
                                <th scope="col" className="px-6 py-3 border-b-2 border-grey-300 w-1/6">Expiry Date</th>
                                <th scope="col" className="px-6 py-3 border-b-2 border-grey-300 w-1/6">Quantity</th>
                                <th scope="col" className="px-6 py-3 border-b-2 border-grey-300 w-1/6">Unit Proce</th>
                                <th scope="col" className="px-6 py-3 border-b-2 border-grey-300 w-1/6">Category</th>
                                <th scope="col" className="px-6 py-3 border-b-2 border-grey-300 w-1/4">Status</th>
                                <th scope="col" className="px-6 py-3 border-b-2 border-grey-300 w-1/6">Action</th>


                            </tr>

                        </thead>
                        <tbody>
                            {products.map(function(product){
                                return(
                                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors">
                                        <td className="px-6 py-3">{product.productId}</td>
                                        <td className="px-6 py-3">{product.name}</td>
                                        <td className="px-6 py-3">{new Date(product.expDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">{product.qty}</td>
                                        <td className="px-6 py-3">{product.unitPrice}</td>
                                        <td className="px-6 py-3">{product.category?.name}</td>
                                        <td className="px-6 py-3">
                                            <span className="text-green-600">{product.qty>0?'In Stock':'Out of Stock'}</span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex space-x-4">
                                                <button className="text-blue-500 hover:text-blue-700" onClick={()=>handelEdit(product)}>Edit</button>
                                                <button className="text-red-500 hover:text-red-700" onClick={()=>handleDelete(product)}>Delete</button>
                                            </div>

                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                </div>
                <div className="container max-w-[30%] bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-700">Stock Management</h2>
                    <form action="">
                        <div className="mb-4">
                            <label htmlFor="" className="block text-gray-700 font-medium mb-2">Product Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400" placeholder="Enter Product Name" value={productName} onChange={handelProductName}/>

                        </div>
                        {/* -------------------- */}
                        <div className="mb-4">
                            <label htmlFor="" className="block text-gray-700 font-medium mb-2">Expiration Date</label>
                            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 " value={expDate?expDate.toISOString().substring(0,10):""} onChange={handelExpDate}/>
                        </div>
                        {/* -------------------- */}
                        <div className="mb-4">
                            <label htmlFor="" className="block text-gray-700 font-medium mb-2">Quantity</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400" placeholder="Enter Product Name"  value={qty} onChange={handelQuantity}/>

                        </div>
                        {/* -------------------- */}
                        <div className="mb-4">
                            <label htmlFor="" className="block text-gray-700 font-medium mb-2">Unit Price</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400" placeholder="Enter Product Name" value={unitprice} onChange={handelUnitPrice}/>

                        </div>
                        {/* ------------------------ */}
                        <div className="mb-4">
                            <label htmlFor="" className="block text-gray-700 font-medium mb-2">Select Category</label>
                            <select name="" id="" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400" value={catId} onChange={handelCatId}>
                                <option >Select category</option>
                                {categories.map(function(category){
                                    return(
                                        <option value={category.catId}>{category.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 mb-4" onClick={handelSubmit}>Add Product</button>
                        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300" onClick={handelSubmit}>Delete Product</button>


                    </form>

                </div>

            </div>
        </>
    )

}
export default Products;