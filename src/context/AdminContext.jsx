import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/category");
      setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/order/allOrder", {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdjNDNkZGMyMjAxNmQ1ZGM2MzE5YyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTMxODUwN30.JzMqW0lsPhhkdNFRsN_z4e8Mkz-KNQn61X--iRiNUtY",
        },
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/product");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/user", {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdjNDNkZGMyMjAxNmQ1ZGM2MzE5YyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMTMxODUwN30.JzMqW0lsPhhkdNFRsN_z4e8Mkz-KNQn61X--iRiNUtY",
        },
      })
      .then((res) => setUsers(res.data.users))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUsers(), fetchOrders(), fetchProducts(), fetchCategories();
  }, []);
  
  const contextValue = {
    products,
    users,
    orders,
    categories,
    setUsers,
    fetchUsers,
    fetchOrders,
    fetchProducts,
    fetchCategories,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
