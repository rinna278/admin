import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import formatPrice from "../../utils/FormatPrice";
import { FaEdit } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const ListProduct = () => {
  const { products, fetchProducts } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState(""); // Quản lý từ khóa tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm đã lọc

  useEffect(() => {
    fetchProducts(); // Lấy sản phẩm khi component load
  }, []);

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/product/delete", {
        data: {
          _id: id,
        },
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjc3ZGJlZmZjYmFmMDM1YjhlNTQyMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMzgyMDc0MX0.3ADoS7sGJxfbmZy6GJgF8j0e5Dbxteje-XSzuB-oYnI",
        },
      });
      fetchProducts()
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-3xl text-gray-800">Products</h1>
          <Link
            to={"/products/add"}
            className="font-semibold text-white rounded-lg bg-indigo-600 px-5 py-2 shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            + Add Product
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by product name or brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 bg-gray-100 px-5 py-3 font-semibold text-gray-600">
            <p className="col-span-2">NAME</p>
            <p>STOCK</p>
            <p>PRICE</p>
            <p>SOLD</p>
            <p>ACTION</p>
          </div>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="grid grid-cols-6 border-b items-center py-3 px-5 hover:bg-gray-50 transition-all" key={product._id}>
                <div className="col-span-2 flex gap-3 items-center">
                  <img
                    className="w-16 h-16 object-cover rounded-lg"
                    src={product.image}
                    alt={product.title}
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-800">{product.title}</p>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                </div>
                <p className="text-gray-700">{product.quantity} in stock</p>
                <div>
                  <p className="text-sm text-gray-500 line-through">Old Price: {formatPrice(product.price)}</p>
                  <p className="text-gray-700 font-semibold">New Price: {formatPrice(product.price - parseInt(product.discount))}</p>
                </div>
                <p className="text-gray-700">{product.sold}</p>
                <div className="flex gap-2 justify-center">
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="flex items-center text-blue-600 bg-blue-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
                  >
                    <FaEdit />
                    <p className="ml-2">Edit</p>
                  </Link>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="flex items-center text-red-600 bg-red-100 px-3 py-2 rounded-lg hover:bg-red-200 transition-all"
                  >
                    <AiOutlineClose />
                    <p className="ml-2">Remove</p>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-5 text-center text-gray-500">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
