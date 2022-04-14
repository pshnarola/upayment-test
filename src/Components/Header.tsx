import React from "react";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
  return (
    <nav className="flex items-center justify-between bg-white p-6 ">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <Link className="font-semibold text-xl tracking-tight" to="/">
          UPayments Store
        </Link>
      </div>

      <div className="block lg:flex lg:items-center  mt-0 w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to={`/products/id`}
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4 text-base"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
