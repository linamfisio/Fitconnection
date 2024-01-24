import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Detail from "./components/detail/Detail";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Form from "./components/form/Form";
import Product from "./components/product/Product";
import Shoppingcart from "./components/shoppingcart/Shoppingcart";
import pathroutes from "./components/helpers/pathroutes";
import "./components/css-modules/App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path={pathroutes.HOME} element={<Home />} />
        <Route path={pathroutes.DETAIL} element={<Detail />} />
        <Route path={pathroutes.FORM} element={<Form />} />
        <Route path={pathroutes.PRODUCT} element={<Product />} />
        <Route path={pathroutes.SHOPPINGCART} element={<Shoppingcart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
