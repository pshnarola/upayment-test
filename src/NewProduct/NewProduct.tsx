import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function NewProduct(): JSX.Element {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const getCategories = () => {
    axios.get("/categories/").then((res) => {
      setCategories(res.data);
    });
  };
  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = (data: any) => {
    const product = {
      name: data.name,
      avatar: data.avatar,
      description: data.description,
      price: data.price,
      category: data.category,
      developerEmail: "mkt@narola.email",
    };
    axios
      .post("/products", product)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-md ">
        <h2 className="flex justify-center text-2xl">Create Product</h2>
        <form
          className="bg-transparent rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
          id="new-product-form"
        >
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pname"
              type="text"
              placeholder="Product Name"
              data-testid="pname"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs ">{errors.name.message} </p>
            )}
          </div>
          <div className="mb-6">
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Description"
              placeholder="Description"
              data-testid="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs ">
                {errors.description.message}{" "}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="iurl"
              type="text"
              data-testid="avatar"
              placeholder="Image URL"
              {...register("avatar", {
                required: "Product image url is required",
              })}
            />
            {errors.avatar && (
              <p className="text-red-500 text-xs ">{errors.avatar.message} </p>
            )}
          </div>
          <div className="mb-4">
            <select
              className="capitalize block appearance-none w-full bg-white border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              data-testid="category"
              {...register("category", { required: "Category is required" })}
            >
              <option className="text-gray-400" value="" disabled selected>
                Categories
              </option>

              {categories.map((category) => (
                <option
                  className="capitalize text-gray-700"
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs ">
                {errors.category.message}{" "}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              data-testid="price"
              placeholder="Price"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs ">{errors.price.message} </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="btnsubmit w-full bg-white hover:bg-gray-100 text-black shadow-md font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              data-testid="submit-button"
              id="submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
