import { useEffect, useState } from "react";
import OrderType from "../types/OrderType";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Orders(){
    const {isAuthenticated,jwtToken}=useAuth();
    const[orders,setOrders]=useState<OrderType[]>([]);
    const config={
        headers:{
          Authorization:`Bearer ${jwtToken}`
        }
      }
    async function loadOrders(){
        try {
            const apiResponse=await axios.get("http://localhost:8081/orders",config);
            setOrders(apiResponse.data);

            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(function(){
        if(isAuthenticated){
            loadOrders();
        }
    },[isAuthenticated])
    return(
        <>
            {/* header */}
            <div className="bg-gradient-to-r from-orange-300 via-orange-400 to-orage-500 w-[450px] p-4 rounded-lg shadow-lg ml-3">
                <p className="text-white text-4xl font-semibold text-left">POS (Point Of Sales)</p>

            </div>
            {/* Orders List */}
            <div className="container max-w-[75%] p-4 bg-white rounded-lg shadow-md">
                <p className="text-orange-700 text-2xl font-bold mb-4">Orders List</p>
                <table className="min-w-full table-auto text-sm text-left text-gray-600 shadow-md">
                    <thead className="bg-orange-200 text-orange-700 uppercase text-sm">
                        <tr>
                            <th scope="col" className="px-6 py-3 border-b-2 border-orange-300 w-1/4">Order ID</th>
                            <th scope="col" className="px-6 py-3 border-b-2 border-orange-300 w-1/4">Order Date</th>
                            <th scope="col" className="px-6 py-3 border-b-2 border-orange-300 w-1/6">Total Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(function(order){
                            return(
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors">
                                    <td className="px-6 py-3">{order.orderId}</td>
                                    <td className="px-6 py-3">{new Date(order.orderDateTime).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">{order.total_price}</td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>

            </div>
        
        </>
    )
}
export default Orders;