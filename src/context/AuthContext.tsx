import { createContext, useContext, useEffect, useState } from "react";
import AuthContextType from "../types/AuthContextType";
import AuthProviderPropsType from "../types/AuthProviderPropsType";

export const AuthContext=createContext<AuthContextType>({
    isAuthenticated:false,
    jwtToken:null,
    loading:true,
    login:()=>{},
    logout:()=>{}
});

export function AuthProvider({children}:AuthProviderPropsType){
    const[isAuthenticated,setIsAuthenticated]=useState<boolean>(false);
    const[jwtToken,setJwtToken]=useState<string|null>(null);
    const[loading,setLoading]=useState<boolean>(true);

    function login(jwtToken:string){
        setIsAuthenticated(true);
        setJwtToken(jwtToken);
        localStorage.setItem("jwtToken",jwtToken)
    }

    function logout(){
        setIsAuthenticated(false);
        setJwtToken(null);
        localStorage.removeItem("jwtToken");
    }
    useEffect(()=>{
        const token=localStorage.getItem("jwtToken");
        if(token){
            setIsAuthenticated(true);
            setJwtToken(token);
            setLoading(false);
        }else{
            setLoading(false);
        }
    },[])

    return (
        <AuthContext.Provider value={{isAuthenticated,loading,jwtToken,login,logout}}>{children}</AuthContext.Provider>
    )

}
export function useAuth(){
    return useContext(AuthContext);
}