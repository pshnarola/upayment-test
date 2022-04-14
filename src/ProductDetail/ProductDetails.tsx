import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetails(): JSX.Element {
  const params = useParams();
  const [product, setProduct] = useState<Product>({});
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = () => {
    setIsLoading(true);
    axios
      .get(
        `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${params.id}`
      )
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center text-2xl mt-5">
          Loading...
        </div>
      ) : (
        <div className="p-5">
          <div className="flex p-8 product-detail-top">
            <img
              src={product?.avatar}
              alt="alternate text"
              className="product-image-detail"
            />
            <div className="flex justify-between flex-col lg:ml-10">
              <h2 className="font-bold text-3xl">{product.name}</h2>
              <h2 className="font-bold text-3xl">$ {product.price}</h2>
            </div>
          </div>
          <hr className="border-black  mb-1" />
          <div className="pl-8 pr-8">
            <h2 className="font-bold text-2xl mb-3">Description</h2>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
