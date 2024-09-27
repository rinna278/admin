import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import ButtonSubmit from "../../components/ButtonSubmit";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import formatDate from "../../utils/FormatDate";
import formatPrice from "../../utils/FormatPrice";
const InforCustomer = () => {
  const { orders } = useContext(AdminContext);
  const { id } = useParams();
  const [cus, setCus] = useState({});
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const orderUser = orders.filter((order) => order.user === id);
  console.log(orderUser);
  console.log(orders);

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${id}`, {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdjNDNkZGMyMjAxNmQ1ZGM2MzE5YyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTMxODUwN30.JzMqW0lsPhhkdNFRsN_z4e8Mkz-KNQn61X--iRiNUtY",
        },
      });
      setCus(res.data.user);
      setData({
        firstname: res.data.user.firstname,
        lastname: res.data.user.lastname,
        mobile: res.data.user.mobile,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:3000/user/update/${id}`,
        data,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdjNDNkZGMyMjAxNmQ1ZGM2MzE5YyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTMxODUwN30.JzMqW0lsPhhkdNFRsN_z4e8Mkz-KNQn61X--iRiNUtY",
          },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full px-3 py-8">
        <Link to={"/customers"} className="flex text-xl gap-3 items-center">
          <IoMdArrowRoundBack />
          <p>Customers</p>
        </Link>
        <h1 className="font-bold text-3xl mb-2 mt-3">{cus.email}</h1>
        <span className="font-medium">user_id:</span>{" "}
        <span className="bg-gray-300 p-1 rounded-lg">{cus._id}</span>
        <div className="shadow-md rounded-lg mt-6">
          <h2 className="font-bold text-lg">Edit Customer</h2>
          <form
            onSubmit={handleUpdateInfo}
            className="grid grid-cols-2 gap-5 mt-3"
          >
            <div className="flex flex-col gap-2 border-2 rounded-lg">
              <label
                htmlFor="firstname"
                className="text-#2F3746 text-lg font-semibold"
              >
                First Name
              </label>
              <input
                id="firstname"
                onChange={onChangeHandle}
                value={data.firstname}
                type="text"
                name="firstname"
                className="outline-none px-3 py-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-2 border-2 rounded-lg">
              <label
                htmlFor="lastname"
                className="text-#2F3746 text-lg font-semibold"
              >
                Last Name
              </label>
              <input
                id="lastname"
                onChange={onChangeHandle}
                value={data.lastname}
                type="text"
                name="lastname"
                className="outline-none px-3 py-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-2 border-2 rounded-lg">
              <label
                htmlFor="mobile"
                className="text-#2F3746 text-lg font-semibold"
              >
                Mobile
              </label>
              <input
                id="mobile"
                onChange={onChangeHandle}
                value={data.mobile}
                type="text"
                name="mobile"
                className="outline-none px-3 py-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 border-2 rounded-lg">
              <label className="text-#2F3746 text-lg font-semibold">
                Email
              </label>
              <input
                readOnly
                value={cus.email}
                type="text"
                name="email"
                className="outline-none px-3 py-2 rounded-lg"
                required
              />
            </div>
            <ButtonSubmit title="Update" />
          </form>
          <div className="shadow rounded-lg mt-5">
            <h2 className="font-bold text-lg">Orders</h2>
            <div className="grid grid-cols-5 bg-gray-100 px-5 ">
              <p className="col-span-2">ID</p>
              <p>Order Date</p>
              <p>TOTAL PRICE</p>
              <p>Status</p>
            </div>
            {orderUser.map((order) => (
              <Link
                to={`/orders/${order._id}`}
                className="grid grid-cols-5 border-b hover:bg-gray-100"
              >
                <div className="col-span-2 flex gap-3">
                  <p className="text-lg">{order._id}</p>
                </div>
                <p>{formatDate(order.orderDate)}</p>
                <p>{formatPrice(order.totalPrice)}</p>
                <p
                  className={`px-3 py-2 w-fit my-3 rounded-lg font-semibold ${
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforCustomer;
