import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

import { FaUserGroup, FaBagShopping, FaCartShopping } from "react-icons/fa6";

const SideBar = () => {
  return (
    <div className="bg-#2F3746 px-4 py-5 flex flex-col h-screen w-1/5 gap-4 ">
      <div className="flex gap-3 ">
        <img src={logo} alt="" />
        <div>
          <p className="text-white font-bold text-2xl">Euphoria</p>
          <p className="text-#9DA4AE">Admin Panel</p>
        </div>
      </div>
      <NavLink
        to={"/customers"}
        className={({ isActive }) => {
          return (
            (isActive ? "bg-#4D5761 text-white " : "text-#9DA4AE ") +
            "flex gap-4 px-4 py-2 items-center rounded-lg"
          );
        }}
      >
        <FaUserGroup className=" size-6" />
        <p className="font-semibold text-xl ">Customers</p>
      </NavLink>
      <NavLink
        to={"/products"}
        className={({ isActive }) => {
          return (
            (isActive ? "bg-#4D5761 text-white " : "text-#9DA4AE ") +
            "flex gap-4 px-4 py-2 items-center rounded-lg "
          );
        }}
      >
        <FaBagShopping className="size-6" />
        <p className="font-semibold text-xl">Products</p>
      </NavLink>
      <NavLink
        to={"/orders"}
        className={({ isActive }) => {
          return (
            (isActive ? "bg-#4D5761 text-white " : "text-#9DA4AE ") +
            "flex gap-4 px-4 py-2 items-center rounded-lg"
          );
        }}
      >
        <FaCartShopping className=" size-6" />
        <p className="font-semibold text-xl ">Orders</p>
      </NavLink>
      <NavLink
        to={"/categories"}
        className={({ isActive }) => {
          return (
            (isActive ? "bg-#4D5761 text-white " : "text-#9DA4AE ") +
            "flex gap-4 px-4 py-2 items-center rounded-lg"
          );
        }}
      >
        <FaCartShopping className=" size-6" />
        <p className="font-semibold text-xl ">Categories</p>
      </NavLink>
    </div>
  );
};

export default SideBar;
