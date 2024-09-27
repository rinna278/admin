import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import ButtonSubmit from "../../components/ButtonSubmit";
import { toast } from "react-toastify";
import axios from "axios";

const CreateCategory = () => {
  const [data, setData] = useState({
    firstLevelCategory: "",
    secondLevelCategory: "",
  });
  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/category/add", 
        data,
        {headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yjc3ZGJlZmZjYmFmMDM1YjhlNTQyMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMzgyMDc0MX0.3ADoS7sGJxfbmZy6GJgF8j0e5Dbxteje-XSzuB-oYnI",
        },}
      );

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
        <h1 className="font-bold text-3xl text-#2F3746">Create Categories</h1>
        <form onSubmit={handleCreateCategory}>
          <div className="flex gap-6 text-lg">
            <div className="flex gap-2 items-center">
              <label htmlFor="men">Men</label>
              <input
                onChange={onChangeHandle}
                className="size-5"
                type="radio"
                name="firstLevelCategory"
                id="men"
                value="men"
              />
            </div>
            <div className="flex gap-3 items-center">
              <label htmlFor="women">Women</label>
              <input
                onChange={onChangeHandle}
                className="size-5"
                type="radio"
                name="firstLevelCategory"
                id="women"
                value="women"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="both">Both</label>
              <input
                onChange={onChangeHandle}
                className="size-5"
                type="radio"
                value="both"
                name="firstLevelCategory"
                id="both"
              />
            </div>
          </div>
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
              value={data.secondLevelCategory}
              type="text"
              name="secondLevelCategory"
              className="outline-none px-3 py-2 rounded-lg"
            />
          </div>
          <ButtonSubmit title="Create" />
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
