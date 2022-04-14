import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Home/Home";
import NewProduct from "./NewProduct/NewProduct";
import ProductDetails from "./ProductDetail/ProductDetails";

function App() {
  return (
    <div className=" bg-gray-300 max-h-max min-h-screen relative">
      {/* <div className="container mx-auto pt-10 "> */}
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/new" element={<NewProduct />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      {/* </div> */}
    </div>
  );
}

export default App;
