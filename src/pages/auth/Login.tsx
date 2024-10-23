import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){
    const [username,setUsername]=useState<string>("");
    const[password,setPassword]=useState<string>("");
    const [error,setError]=useState<string>("");
    const{login}=useAuth();
    const navigate=useNavigate();
    async function handelLogin(event:any){
        event.preventDefault();
        if(username=="" || password==""){
            setError("Please enter a valid username and password.")
        }
        try {
            const data={
                username:username,
                password:password
            }
            const response=await axios.post("http://localhost:8081/auth/login",data);
            login(response.data);
            navigate("/Navbar");

            

            
        } catch (error) {
            setError("There was an error");
            
        }
    }
    return(
        <div className="flex items-center justify-center h-screen bg-bray-100">
            <div className="max-w-[800px] w-full mx-auto p-10 shadow-2xl rounded-lg bg-white">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-orange-600">Welcome Back!</h1>
                    <p className="text-xl text-gray-600 mt-2">Please login to your account</p>

                </div>
                <form action="" onSubmit={handelLogin}>
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2 text-lg text-gray-600">Username</label>
                        <input type="text" id="username" className="w-full p-4 border border-gray-300 rounded-lg text-lg" placeholder="Enter your usename" onChange={(event)=>{
                            setUsername(event.target.value);
                            setError("");
                        }}/>
                        
                    </div>
                    {/* password */}
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2 text-lg text-gray-600">Username</label>
                        <input type="password" id="password" className="w-full p-4 border border-gray-300 rounded-lg text-lg" placeholder="Enter your usename" onChange={(event)=>{
                            setPassword(event.target.value);
                            setError("");
                        }}/>
                        
                    </div>
                    {/* error message */}
                    {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

                    <div className="mt-8">
                        <button type="submit" className="w-full py-3 text-xl bg-orange-600 text-white rounded-lg hover:bg-orange-800" >Login</button>

                    </div>

                    <div className="mt-4">
                        <button className="w-full py-3 text-xl bg-gray-500 text-white rounded-lg hover:bg-gray-700">Register</button>

                    </div>
                </form>
            </div>

        </div>
    )
}
export default Login;