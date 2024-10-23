import React, { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import Products from "./Products";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/AuthContext";
import html2pdf from "html2pdf.js";

function CreateOrder() {
  const{isAuthenticated,jwtToken}=useAuth();
  const config={
    headers:{
      Authorization:`Bearer ${jwtToken}`
    }
  }

  
  const [products,setProducts]=useState<ProductType[]>([]);
  const[grandTotal,setGrandTotal]=useState<number>(0.0);
  const[selectedProducts,setSelectedProducts]=useState<ProductType| null>(null);
  const[orderedProducts,setOrderedProducts]=useState<{product:ProductType;quantity:number}[]>([]);
  const[quantity,setQuantity]=useState<number>(1);
  async function loadProducts(){
    try {
        console.log("get request in Create Order")
        const apiResponse=await axios.get("http://localhost:8081/product",config);
        setProducts(apiResponse.data);
    } catch (error) {
        console.log(error);
        
    }

  }
  // selecting product Button
  function handelSelectedProducts(product:ProductType){
    setSelectedProducts(product);
    setQuantity(1);

  }
  // onCHange quantity button
  function handelQuantity(event:any){
    setQuantity(parseInt(event.target.value));

  }
  // addtoInvocebutton
  function addToInvoice(product:ProductType){
    const existingProduct=orderedProducts.find((item)=>item.product.productId===product.productId);
    if(existingProduct){
      //update the quantity if the product already exists in the invoice
      const updatedProducts=orderedProducts.map((item)=>
      item.product.productId===product.productId?{...item,quantity:item.quantity+quantity}:item);
      setOrderedProducts(updatedProducts)
    }else{
      const newOrder=[...orderedProducts,{product,quantity}];
      setOrderedProducts(newOrder);
    }
    const total=grandTotal+product.unitPrice* quantity;
    setGrandTotal(total);
  }
  const generatePDF = async () => {
    const element = document.getElementById('invoice'); // or useRef to refer to the section
    const html2pdfModule = await import('html2pdf.js');
    html2pdfModule.default().from(element).save();
  };
  

  async function handelSave(){
    const date={
      total_price:grandTotal
    }

    try {
      await axios.post("http://localhost:8081/orders",date,config);
      notify();
    } catch (error) {
      console.log(error)
    }

  }
  const notify=()=>{
    toast.success("Order Saved", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  }
  useEffect(function(){
    if(isAuthenticated){
      loadProducts();
    }
  },[isAuthenticated])


  return (
    <div className="flex">
      {/* Products Section */}
      <div className="p-4 w-[400px]">
        <div className="text-2xl text-slate-700 font-bold mb-5">
          Products
        </div>
        <div className="overflow-y-auto h-[500px] space-y-4">
         {products.map((product)=>(
            <div key={product.productId} className="p-4 border border-slate-300 rounded-lg hover:shadow-lg cursor-pointer" onClick={()=>handelSelectedProducts(product)}>
            <div className="text-lg font-semibold text-slate-800">{product.name}</div>
            <div className="text-m text-slate-500">{product.category?.catId}</div>
            <div className="text-green-600 text-right">{product.unitPrice}</div>
            </div>
         ))} 
        </div>        
      </div>

      {/* Order Summary Section */}
      <div className="w-full p-4">
        <div className="text-2xl text-slate-700 font-bold mb-5">Invoice</div>
        
        <div className="border p-6 rounded-lg shadow-lg bg-white" >
          <div id="invoice">
          <div className="text-2xl font-bold text-slate-800 mb-4" id="invoice">Invoice</div>
          {/* Table for OrderedProduct */}
          <table className="min-w-full table-auto text-left mb-4"> 
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-gray-700">Product Name</th>
                <th className="px-4 py-2 text-gray-700">Quantity</th>
                <th className="px-4 py-2 text-gray-700">UnitPrice</th>
                <th className="px-4 py-2 text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderedProducts.map(function(orderedProduct){
                return(
                  <tr key={orderedProduct.product.productId}>
                    <td className="px-4 py-2 text-gray-700">{orderedProduct.product.name}</td>
                    <td className="px-4 py-2 text-gray-700">{orderedProduct.quantity}</td>
                    <td className="px-4 py-2 text-gray-700">Rs.{orderedProduct.product.unitPrice}</td>
                    <td className="px-4 py-2 text-gray-700">Rs.{orderedProduct.product.unitPrice* orderedProduct.quantity}</td>

                  </tr>
                )
              })}
            </tbody>
            {/*  Logic to show orderedProducts */}
          </table>
          {/* total price */}
          <div className="text-right text-xl font-semibold text-slate-700">
            Grand Total: {grandTotal}
          </div>
          </div>

          {/* buttons for actions */}
          <div className="mt-6 flex justify-between">
            
            <button className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-800" onClick={generatePDF} >Print Invoice</button>  {/* Add logic to print PDF */}
            <button className="py-2 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-800" onClick={handelSave} >Save Order</button>
            <ToastContainer />
          </div>
          

        </div>
        {/* form to add products to the invoice */}
        <div className="mt-8 p-4 border rounded-lg bg-gray-50 shadow-md">
          <div className="text-lg font-bold text-slate-700 mb-4">Add to Invoice</div>
          <form action="" className="space-y-4">
            {/* display selected product Information */}
            {selectedProducts?(
              <>
              <div>
                <label htmlFor="" className="block text-gray-600 mb-1">Product Name</label>
                <input type="text" value={selectedProducts.name} disabled className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100" />
              </div>

              <div>
                <label htmlFor="" className="block text-gray-600 mb-1">Product Name</label>
                <input type="text" value={`Rs.${selectedProducts.unitPrice}`} disabled className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100" />
              </div>

              <div>
                <label htmlFor="">Quantity</label>
                <input type="number"
                 min="1" 
                 value={quantity} 
                 onChange={handelQuantity}
                 className="w-full p-2 border border-gray-300 rounded-lg"
                 />
              </div>

              {/* add to invoice button */}
              <button type="button" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={()=>addToInvoice(selectedProducts)}>Add to Invoice</button>

              </>
            ):(
              <div className="text-gray-500">Select a product to add to the invoice</div>
            )}
          </form>

        </div>

      </div>
    </div>
  );
}

export default CreateOrder;
