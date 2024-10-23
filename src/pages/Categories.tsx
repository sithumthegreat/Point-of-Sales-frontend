import { useEffect, useState } from "react";
import CategoryTypes from "../types/CategoryTypes";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Categories(){
    const {isAuthenticated,jwtToken}=useAuth();
    const config={
      headers:{
        Authorization:`Bearer ${jwtToken}`
      }
    }
    const [categories,setCategories]=useState<CategoryTypes[]>([]);
    const [categoryName,setCategoryName]=useState<string>("");
    const [editMode,setEditMode]=useState<boolean>(false);
    const[catId,setCatId]=useState<number | null>(null);
    const[deleteMode,setDeleteMode]=useState<boolean>(false);
    async function loadCategories(){
        const apiResponse=await axios.get("http://localhost:8081/category",config);
        setCategories(apiResponse.data);
        
    }

    function handelCategoryName(event:any){
      setCategoryName(event.target.value);

    }
    async function handelAddCategory(evet:any){
      event?.preventDefault();
      console.log("handel addCategory Stsrting")
      const data={
        name:categoryName
      }
      try {
        if(editMode && catId!=null){
          console.log("edit mode if starting");
          await axios.put(`http://localhost:8081/category/${catId}`,data,config);
          
          setEditMode(false);
          setCatId(null);
        }else if(deleteMode){
          await axios.delete(`http://localhost:8081/category${catId}`,config);
        
          setDeleteMode(false);
        }else{
          await axios.post("http://localhost:8081/category",data,config);

        }
        loadCategories();
        setCategoryName("");
      
      } catch (error:any) {
        console.log(error);
        
      }

    }

    function handleEdit(category:CategoryTypes){
      setCategoryName(category.name);
      setCatId(category.catId);
      setEditMode(true);

    }

    function handleDelete(category:CategoryTypes){

    }
    useEffect(function(){
      if(isAuthenticated){
        loadCategories();

      }
       
    },[isAuthenticated])
    return (

      <>
         
        <div className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 w-[450px] p-4 rounded-lg shadow-lg ml-3">
          <p className="text-white text-4xl font-semibold text-left">POS (Point Of Sales)</p>
        </div>
    
        <div className="flex mt-8 ml-3 space-x-8">
          {/* Table Section */}
          <div className="w-1/2">
            <p className="text-gray-700 text-2xl font-bold mb-4">Product Category List</p>
    
            <table className="min-w-full table-auto text-sm text-left text-gray-600 shadow-md">
              <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3 border-b-2 border-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-3">{category.catId}</td>
                    <td className="px-6 py-3">{category.name}</td>
                    <td className="px-6 py-3">{new Date(category.date).toLocaleDateString()}</td>
                    <td className="px-6 py-3">
        <div className="flex space-x-4">
          {/* Edit Button */}
          <span 
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => handleEdit(category)} // Add your edit function here
          >
            Edit
          </span>
          
          {/* Delete Button */}
          <span 
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => handleDelete(category)} // Add your delete function here
          >
            Delete
          </span>
        </div>
      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Form Section */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Add New Category</h2>
    
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Category Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter category name"
                  onChange={handelCategoryName}
                  value={categoryName}
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                onClick={handelAddCategory}
              >
                {editMode?'Update Category':'Add Category'}
              </button>
            </form>
          </div>
        </div>
      </>
    );
    
      
}
export default Categories;