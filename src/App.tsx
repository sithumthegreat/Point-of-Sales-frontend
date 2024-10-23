import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Navigate,Route,Routes, useLocation } from 'react-router-dom'
import './App.css'
import Categories from './pages/Categories'

import Products from './pages/Products'
import Navbar from './pages/Navbar'
import CreateOrder from './pages/CreateOrder'
import Orders from './pages/Orders'
import Login from './pages/auth/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
// import Tests from './pages/Tests'

function App() {
  
  

  return (

    <>
    <AuthProvider>
     <BrowserRouter>
      {  location.pathname !='/auth/login' && location.pathname!='/' && <Navbar/>}
      {/* {isAuthenticated  && <Navbar/>} */}
        <div>
        <Routes>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/Categories" element={<Categories/>}/>       
            <Route path="/Product" element={<Products/>}/>  
            { <Route path="/Navbar" element={<Navbar/>}/>   }
            <Route path="/CreateOrder" element={<CreateOrder/>}/>  
            <Route path="/Orders" element={<Orders/>}/>
            {/* <Route path="/Tests" element={<Tests/>}/> */}            
          </Route>
          
        </Routes>
        </div>      
      </BrowserRouter> 
     </AuthProvider>      
    </>
  )
}

export default App
