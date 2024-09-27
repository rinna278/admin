import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { AdminContext } from "../../context/AdminContext";
import { AiOutlineClose } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ListCategory = () => {
  const { categories, fetchCategories } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredCategories, setFilteredCategories] = useState([]); 

  useEffect(() => {
    fetchCategories(); 
  }, []);

  useEffect(() => {
    
    setFilteredCategories(
      categories
        .filter((category) => category.level === 2)
        .filter((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [categories, searchTerm]);

  const handleRemove = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category and its related products?"
    );
    if (!confirmed) return;

    try {
      const res = await axios.delete("http://localhost:3000/category/delete", {
        data: {
          id: id,
        },
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjc3ZGJlZmZjYmFmMDM1YjhlNTQyMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMzgyMDc0MX0.3ADoS7sGJxfbmZy6GJgF8j0e5Dbxteje-XSzuB-oYnI",
        },
      });
      fetchCategories();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category.");
    }
  };
  useEffect(()=>{
    fetchCategories()
  },[])
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full px-8 py-8">
      
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-3xl text-gray-800">Categories</h1>
          <Link
            to={"/categories/create"}
            className="font-semibold text-white rounded-lg bg-indigo-600 px-5 py-3 shadow hover:bg-indigo-700 transition duration-200"
          >
            + Add
          </Link>
        </div>

      
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by category name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      
        <div className="shadow rounded-lg bg-white">
          <div className="grid grid-cols-4 bg-gray-100 px-5 py-3 font-semibold text-gray-600">
            <p className="col-span-2">NAME</p>
            <p>PARENT CATEGORY</p>
            <p>ACTION</p>
          </div>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category._id}
                className="grid grid-cols-4 border-b px-5 py-3 hover:bg-gray-50 transition-all"
              >
                <div className="col-span-2 flex flex-col">
                  <p className="text-lg font-medium text-gray-800">{category.name}</p>
                  <p className="text-sm text-gray-500">{category._id}</p>
                </div>
                <p className="text-gray-700">{category.parentCategory?.name}</p>
                <div className="flex gap-3">
                  <Link
                    to={`/categories/${category._id}`}
                    className="flex items-center text-blue-600 bg-blue-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
                  >
                    <FaEdit />
                    <p className="ml-2">Edit</p>
                  </Link>
                  <button
                    onClick={() => handleRemove(category._id)}
                    className="flex items-center text-red-600 bg-red-100 px-3 py-2 rounded-lg hover:bg-red-200 transition-all"
                  >
                    <AiOutlineClose />
                    <p className="ml-2">Remove</p>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-5 text-center text-gray-500">No categories found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
