import React, { useContext, useRef, useState } from "react";
import SideBar from "../../components/SideBar";
import { CiCircleRemove } from "react-icons/ci";
import { Editor } from "@tinymce/tinymce-react";
import ButtonSubmit from "../../components/ButtonSubmit";
import upload_area from "../../assets/upload_area.jpg";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddProduct = () => {
  const navigate = useNavigate();
  const { products, categories } = useContext(AdminContext);
  const childCate = categories.filter((item) => item.level === 2);
  const [forms, setForms] = useState([]);
  const editorRef = useRef(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    brand: "",
  });
  const [image, setImage] = useState("");
  const [stocks, setStocks] = useState([
    {
      size: "",
      color: "",
      quantity: 0,
    },
  ]);

  const addForm = () => {
    setForms([...forms, { id: forms.length }]);
    setStocks([...stocks, { size: "", color: "", quantity: 0 }]);
  };
  const subForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const brands = [...new Set(products.map((product) => product.brand))];

  const handleInputChange = (index, event, key) => {
    const updatedStocks = stocks.map((stock, i) => {
      if (i === index) {
        return {
          ...stock,
          [key]: event.target.value,
        };
      }
      return stock;
    });
    setStocks(updatedStocks);
  };

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleEditorChange = (newContent, editor) => {
    setData((prevData) => ({
      ...prevData,
      description: newContent,
    }));
  };
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("image", image);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("brand", data.brand);
  formData.append("category", data.category);
  formData.append("stock", JSON.stringify(stocks));

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/product/createProduct",
        formData,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJiMjg3ZWE0YzExMTJlODhmNWQyZCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyNjEzMjk1MX0.hN3PI_YjSgCIJlmyXtjRhm7cf9dNAAo8gEfODHT2ntg",
          },
        }
      );
      navigate("/products");
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
        <h1 className="text-3xl font-semibold">Create a new product</h1>
        <form onSubmit={handleCreateProduct} className="flex flex-col gap-10">
          <div className="flex shadow rounded-xl justify-between">
            <p className="font-bold px-6 py-8">Basic details</p>
            <div className="w-2/3">
              <input
                required
                name="title"
                type="text"
                onChange={onChangeHandle}
                placeholder="Product name"
                className="mb-5 border-2 outline-none rounded-lg px-3 py-2 w-full"
              />
              <label htmlFor="" className="text-#4D5761">
                Description
              </label>
              <Editor
                apiKey="bt275qmawkty6u5199nsuda4sp4qgrs5saj0zjob005krtmb"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue=""
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
          <div className="flex shadow rounded-xl justify-between">
            <p className="font-bold px-6 py-8">Image</p>

            <div className="w-2/3">
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : upload_area}
                  alt=""
                />
              </label>
              <input
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                required
                type="file"
                class="hidden"
              />
            </div>
          </div>
          <div className="flex shadow rounded-xl justify-between">
            <p className="font-bold px-6 py-8">Category</p>

            <div className="w-2/3 flex flex-col gap-3">
              <label htmlFor="category">Select caterogy</label>
              <div className="flex">
                <select
                  onChange={onChangeHandle}
                  name="category"
                  id=""
                  className="mb-5 border-2 rounded-lg px-3 py-3 "
                >
                  <option value="">select category</option>

                  {childCate.map((category) => (
                    <option
                      value={category._id}
                    >{`${category?.name} for ${category?.parentCategory?.name}`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex shadow rounded-xl justify-between">
            <p className="font-bold px-6 py-5">Pricing</p>
            <input
              onChange={onChangeHandle}
              required
              name="price"
              type="number"
              className="border-2 outline-none rounded-lg px-3 w-2/3"
              placeholder="Price"
            />
          </div>
          <div className="flex shadow rounded-xl justify-between">
            <p className="font-bold px-6 py-8">Brand</p>
            <div className="w-2/3">
              <div className="flex">
                <input
                  id="brand"
                  required
                  onChange={onChangeHandle}
                  type="text"
                  value={data.brand}
                  name="brand"
                  placeholder="Brand"
                  className="mb-5 border-2 border-r-0 outline-none rounded-lg px-3 py-2 w-full"
                />
                <select
                  value={data.brand}
                  onChange={onChangeHandle}
                  name="brand"
                  id=""
                  className="mb-5 border-2 border-l-0  outline-none rounded-lg px-3 py-3  "
                >
                  <option value="">Select brand</option>
                  {brands.map((brand) => (
                    <option value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex shadow rounded-xl justify-between">
            <p className="font-bold px-6 py-8">Stock</p>
            <div className="flex flex-col">
              <div className="w-full">
                <div className=" flex gap-5">
                  <div className="w-full flex flex-col">
                    <label htmlFor="size">Size{0}</label>
                    <select
                      onChange={(e) => handleInputChange(0, e, "size")}
                      name="size"
                      id="size"
                      required
                      className=" border-2 outline-none rounded-lg px-3 py-2"
                    >
                      <option value="">Select size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="2XL">2XL</option>
                      <option value="3XL">3XL</option>
                    </select>
                  </div>
                  <div className="w-full flex flex-col">
                    <label htmlFor="color">Color</label>
                    <select
                      onChange={(e) => handleInputChange(0, e, "color")}
                      required
                      name="color"
                      id="color"
                      className="mb-5 border-2 outline-none rounded-lg px-3 py-2 w-full"
                    >
                      <option value="">Select color</option>
                      <option value="white">white</option>
                      <option value="blue">blue</option>
                      <option value="red">red</option>
                      <option value="yellow">yellow</option>
                      <option value="purple">purple</option>
                      <option value="black">black</option>
                    </select>
                  </div>

                  <div className="w-full flex flex-col">
                    <label htmlFor="">Quantity</label>
                    <input
                      onChange={(e) => handleInputChange(0, e, "quantity")}
                      required
                      type="number"
                      className="mb-5 border-2 outline-none rounded-lg px-3 py-2 w-full"
                    />
                  </div>
                </div>
              </div>
              {forms.map((form, index) => (
                <div className="w-full">
                  <div className=" flex gap-5">
                    <div className="w-full flex flex-col">
                      <label htmlFor="size">Size{index}</label>
                      <select
                        onChange={(e) =>
                          handleInputChange(index + 1, e, "size")
                        }
                        name="size"
                        id="size"
                        required
                        className=" border-2 outline-none rounded-lg px-3 py-2"
                      >
                        <option value="">Select size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                        <option value="3XL">3XL</option>
                      </select>
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="color">Color</label>
                      <select
                        onChange={(e) =>
                          handleInputChange(index + 1, e, "color")
                        }
                        required
                        name="color"
                        id="color"
                        className="mb-5 border-2 outline-none rounded-lg px-3 py-2 w-full"
                      >
                        <option value="">Select color</option>
                        <option value="white">white</option>
                        <option value="blue">blue</option>
                        <option value="red">red</option>
                        <option value="yellow">yellow</option>
                        <option value="purple">purple</option>
                        <option value="black">black</option>
                      </select>
                    </div>

                    <div className="w-full flex flex-col">
                      <label htmlFor="">Quantity</label>
                      <input
                        onChange={(e) =>
                          handleInputChange(index + 1, e, "quantity")
                        }
                        required
                        type="number"
                        className="mb-5 border-2 outline-none rounded-lg px-3 py-2 w-full"
                      />
                    </div>
                    <button onClick={() => subForm(form.id)}>
                      <CiCircleRemove className="size-7" />
                    </button>
                  </div>
                </div>
              ))}
              <div
                className="px-4 py-2 rounded-full w-fit bg-#6366F1 text-white"
                onClick={addForm}
              >
                +
              </div>
            </div>
          </div>
          <ButtonSubmit title="Create" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
