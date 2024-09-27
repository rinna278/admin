import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import formatPrice from "../../utils/FormatPrice";
import { AdminContext } from "../../context/AdminContext";
import formatDate from "../../utils/FormatDate";

const ListOrder = () => {
  const { orders, fetchOrders } = useContext(AdminContext);
  const [cur, setCur] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredOrders, setFilteredOrders] = useState([]); 

  useEffect(() => {
    fetchOrders(); 
  }, []);

  useEffect(() => {
    setFilteredOrders(
      orders
        .filter((order) => (cur === "All" ? order : order.orderStatus === cur))
        .filter(
          (order) =>
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formatDate(order.orderDate).includes(searchTerm)
        )
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    );
  }, [cur, searchTerm, orders]);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full px-8 py-8">
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-800">Orders</h1>
        </div>

       
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by OrderID or Date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
        </div>

        <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="flex gap-4">
            <ul className="flex gap-4 font-semibold text-gray-500">
              <li
                onClick={() => setCur("All")}
                className={`${cur === "All" ? "text-indigo-600" : ""} cursor-pointer`}
              >
                All
              </li>
              <li
                onClick={() => setCur("Canceled")}
                className={`${cur === "Canceled" ? "text-indigo-600" : ""} cursor-pointer`}
              >
                Canceled
              </li>
              <li
                onClick={() => setCur("Order Placed")}
                className={`${cur === "Order Placed" ? "text-indigo-600" : ""} cursor-pointer`}
              >
                Order Placed
              </li>
              <li
                onClick={() => setCur("Inprogress")}
                className={`${cur === "Inprogress" ? "text-indigo-600" : ""} cursor-pointer`}
              >
                Inprogress
              </li>
              <li
                onClick={() => setCur("Shipped")}
                className={`${cur === "Shipped" ? "text-indigo-600" : ""} cursor-pointer`}
              >
                Shipped
              </li>
              <li
                onClick={() => setCur("Delivered")}
                className={`${cur === "Delivered" ? "text-indigo-600" : ""} cursor-pointer`}
              >
                Delivered
              </li>
            </ul>
          </div>
        </div>

        <div className="shadow rounded-lg bg-white">
          <div className="grid grid-cols-6 bg-gray-100 px-5 py-3 font-semibold text-gray-600">
            <p className="col-span-2">ID</p>
            <p>Order Date</p>
            <p>TOTAL ITEM</p>
            <p>TOTAL PRICE</p>
            <p>Status</p>
          </div>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Link
                to={`/orders/${order._id}`}
                className="grid grid-cols-6 border-b px-5 py-3 hover:bg-gray-50 transition-all"
                key={order._id}
              >
                <div className="col-span-2 flex gap-3 items-center">
                  <p className="text-lg text-gray-700">{order._id}</p>
                </div>
                <p className="text-gray-700">{formatDate(order.orderDate)}</p>
                <p className="text-gray-700">{order.orderItems.length}</p>
                <p className="text-gray-700">{formatPrice(order.totalPrice - order.totalDiscountPrice + 5)}</p>
                <p
                  className={`px-3 py-2 w-fit rounded-lg font-semibold ${
                    order.orderStatus === "Order Placed"
                      ? "text-blue-600 bg-blue-100"
                      : order.orderStatus === "Canceled"
                      ? "text-red-600 bg-red-100"
                      : order.orderStatus === "Inprogress"
                      ? "text-yellow-600 bg-yellow-100"
                      : order.orderStatus === "Shipped"
                      ? "text-pink-600 bg-pink-100"
                      : order.orderStatus === "Delivered"
                      ? "text-green-600 bg-green-100"
                      : ""
                  }`}
                >
                  {order.orderStatus}
                </p>
              </Link>
            ))
          ) : (
            <div className="py-5 text-center text-gray-500">No orders found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
