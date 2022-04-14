import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/ProductCard/ProductCard";
import debounce from "lodash/debounce";
import { FaPlus } from "react-icons/fa";
import SweetAlert from "react-bootstrap-sweetalert";

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [filtredProducts, setFiltredProducts] = useState<Array<Product>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [productId, setProductId] = useState(null);
  const navigate = useNavigate();

  const getProducts = () => {
    setIsLoading(true);
    axios
      .get("/products/")
      .then((res) => {
        setProducts(res.data);
        setFiltredProducts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const getCategories = () => {
    axios.get("/categories/").then((res) => {
      setCategories(res.data);
    });
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const onCategoryChange = (e: any) => {
    const filtredProducts = products.filter(
      (product) => product.category === e.target.value
    );
    if (e.target.value === "all") {
      setFiltredProducts(products);
    } else {
      setFiltredProducts(filtredProducts);
    }
  };

  const deleteProduct = (id: any) => {
    axios
      .delete(`/products/${id}`)
      .then((res) => {
        getProducts();
        setIsModalActive(false);
        setModalSuccess(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const searchProduct = debounce((e) => {
    const filtredProducts = products.filter((product: any) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltredProducts(filtredProducts);
  }, 500);
  const handleDeleteModal = (id: any) => {
    setProductId(id);
    setIsModalActive(true);
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center text-2xl mt-5">
          Loading...
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex items-center justify-between bg-transparent px-6  mb-4  search-input">
            <input
              className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Search"
              onChange={searchProduct}
            />

            <div className="relative">
              <select
                className="capitalize block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={onCategoryChange}
              >
                <option value="" disabled selected>
                  Categories
                </option>
                <option value="all">All</option>

                {categories.map((category) => (
                  <option className="capitalize" value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
              {filtredProducts.map((product: any) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  handleDeleteModal={handleDeleteModal}
                  deleteProduct={deleteProduct}
                />
              ))}
              {!filtredProducts.length && <h2>No Products Available</h2>}
            </div>
          </div>
        </div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full text-2xl plus-button"
        onClick={() => navigate("/product/new")}
      >
        <FaPlus />
      </button>
      <SweetAlert
        show={isModalActive}
        warning
        title="Are you sure?"
        onConfirm={() => deleteProduct(productId)}
        onCancel={() => setIsModalActive(false)}
        confirmBtnText="Delete"
        showCancel
        confirmBtnCssClass="bg-red-500 text-white hover:bg-red-400  font-semibold py-2 px-4 border border-gray-400 rounded "
        cancelBtnCssClass="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      ></SweetAlert>
      <SweetAlert
        show={modalSuccess}
        success
        title="Product Deleted"
        onConfirm={() => setModalSuccess(false)}
        confirmBtnCssClass="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      ></SweetAlert>
    </div>
  );
}
