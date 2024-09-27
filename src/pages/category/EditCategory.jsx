import React, { useContext, useState } from "react";
import SideBar from "../../components/SideBar";
import ButtonSubmit from "../../components/ButtonSubmit";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
const EditCategory = () => {
  const {  categories } = useContext(AdminContext);
   const parentCate =categories.filter(item=>(item.level===1))
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    parentCategory:""
  });
  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/category/${id}`)
      .then((res) => setData(res.data.category))
      .catch((error) => console.log(error));
  }, []);

  console.log(data);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:3000/category/update/${id}`,
        data,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjc3ZGJlZmZjYmFmMDM1YjhlNTQyMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMzgyMDc0MX0.3ADoS7sGJxfbmZy6GJgF8j0e5Dbxteje-XSzuB-oYnI",
          },
        }
      );
      navigate("/categories");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full px-3 py-8">
        <h1 className="font-bold text-3xl text-#2F3746">Edit Categories</h1>
        <form onSubmit={handleUpdateCategory}>
          <select
            onChange={onChangeHandle}
            name="parentCategory"
            id=""
            className="mb-5 border-2 rounded-lg px-3 py-3 "
          >
            <option value={data?.parentCategory._id}>{data?.parentCategory.name}</option>

            {parentCate.map((category) => (
              <option
                value={category._id}
              >{`${category?.name}`}</option>
            ))}
          </select>
          <div className="flex flex-col gap-2 border-2 rounded-lg w-fit">
            <label
              htmlFor="second"
              className="text-#2F3746 text-lg font-semibold"
            >
              Second Level
            </label>
            <input
              id="second"
              onChange={onChangeHandle}
              value={data.name}
              type="text"
              name="name"
              className="outline-none px-3 py-2 rounded-lg"
            />
          </div>
          <ButtonSubmit title="Update" />
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
