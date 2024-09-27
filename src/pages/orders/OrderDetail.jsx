import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import SideBar from "../../components/SideBar";
import formatPrice from "../../utils/FormatPrice";
import formatDate from "../../utils/FormatDate";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ButtonSubmit from "../../components/ButtonSubmit";
import { toast } from "react-toastify";
const OrderDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/order/${id}`, {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdjNDNkZGMyMjAxNmQ1ZGM2MzE5YyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTMxODUwN30.JzMqW0lsPhhkdNFRsN_z4e8Mkz-KNQn61X--iRiNUtY",
        },
      });
      setOrder(res.data.order);
      setStatus(res.data.order.orderStatus);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  const handleUpdateStatus = async (status) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/order/updateStatus",
        {
          id: id,
          orderStatus: status,
        },
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdjNDNkZGMyMjAxNmQ1ZGM2MzE5YyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTMxODUwN30.JzMqW0lsPhhkdNFRsN_z4e8Mkz-KNQn61X--iRiNUtY",
          },
        }
      );
      toast.success(res.data.message);
      navigate('/orders')
    } catch (error) {
      console.log(error);
    }
  };
  console.log(order);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full px-3 py-8">
        <Link to={"/orders"} className="flex text-xl gap-3 items-center">
          <IoMdArrowRoundBack />
          <p>Orders</p>
        </Link>

        <div className="rounded-lg shadow px-6 py-8 flex flex-col gap-4">
          <h2 className="font-bold">Basic info</h2>
          <div className="grid grid-cols-4">
            <p className="font-medium">Customer</p>
            <div className="col-span-3">
              <p className="font-medium">{`${order.user?.firstname} ${order.user?.lastname}`}</p>
              <p className="text-gray-400">{order.user?.email}</p>
              <p className="text-gray-400">{order.user?.mobile}</p>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <p className="font-medium">ID</p>
            <p className="text-gray-400 col-span-3">{order._id}</p>
          </div>
          <div className="grid grid-cols-4">
            <p className="font-medium">Date</p>
            <p className="text-gray-400 col-span-3">
              {formatDate(order.orderDate)}
            </p>
          </div>
          <div className="grid grid-cols-4">
            <p className="font-medium">Address</p>
            <p className="text-gray-400 col-span-3">
              {`${order.shippingAddress?.deliInstruction} ${order.shippingAddress?.apartment}, ${order.shippingAddress?.streetAddress}, ${order.shippingAddress?.state}, ${order.shippingAddress?.city}, ${order.shippingAddress?.country}`}
            </p>
          </div>
          <div className="grid grid-cols-4">
            <p className="font-medium">Total Amount</p>
            <p className="text-gray-400 col-span-3">
              {formatPrice(order.totalPrice - order.totalDiscountPrice + 5)}
            </p>
          </div>
          <div className="grid grid-cols-4">
            <p className="font-medium">Status</p>
            {order.orderStatus === "Canceled" || order.orderStatus === "Delivered" ? (
              <p className={`${order.orderStatus ==="Canceled" ? 'text-red-500 bg-red-100': 'text-green-500 bg-green-100'} font-semibold px-3 py-2  w-fit col-span-3`}>{order.orderStatus}
            </p>
            ) : (
              <>
                <select
                  name="status"
                  className="outline-none border-2 rounded-lg p-3"
                  id=""
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Canceled">Canceled</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Inprogress">Inprogress</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <ButtonSubmit
                  title="Save"
                  active={() => handleUpdateStatus(status)}
                />
              </>
            )}
          </div>
        </div>
        <div className="rounded-lg shadow px-6 py-8 flex flex-col gap-4">
          <h2 className="font-bold">Order Items</h2>
          <div className="grid grid-cols-5 place-items-center font-bold">
            <p>TITLE</p>
            <p>COLOR</p>
            <p>SIZE</p>
            <p>QUANTITY</p>
            <p>AMOUNT</p>
          </div>
          {order.orderItems?.map((item) => (
            <div className="grid grid-cols-5 place-items-center py-6 border">
              <p>{item.product?.title}</p>
              <p>
                Color : <span className="text-#807D7E">{item.color}</span>
              </p>
              <p>
                Size : <span className="text-#807D7E">{item.size}</span>
              </p>
              <p>
                Qty : <span>{item.quantity}</span>
              </p>
              <p>
                {formatPrice(
                  item.quantity * item.price 
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
