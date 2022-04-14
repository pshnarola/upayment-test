import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

interface CardProps extends Product {
  deleteProduct: (id: any) => void;
  handleDeleteModal: (id: any) => void;
}

export default function ProductCard({
  avatar,
  name,
  price,
  id,
  deleteProduct,
  handleDeleteModal,
}: CardProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="relative justify-center product-card-wrapper bg-white rounded product-card-wrapper">
      <div
        className="card-top flex justify-center"
        onClick={() => navigate(`/product/${id}`)}
      >
        <div className="mx-auto card-image">
          <img
            className="w-full p-5 object-contain product-image-card"
            src={avatar}
            alt="product"
          />
        </div>
        <div className="px-3 py-2 bottom-0">
          <p className="font-bold mb-2 truncate text-[15px] ">{name}</p>
          <p className="text-gray-700 text-base">$ {price}</p>
        </div>
      </div>
      <div className="flex justify-center absolute top-3 right-3">
        <button
          className="text-red font-bold "
          onClick={() => handleDeleteModal(id)}
        >
          <FaTrash className="text-red-600" />
        </button>
      </div>
    </div>
  );
}
