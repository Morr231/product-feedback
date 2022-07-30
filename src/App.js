import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Main from "./components/main";
import AddFeedback from "./components/add-feedback";
import Product from "./components/product";

import data from "./data";

function App() {
    useEffect(() => {
        if (!window.localStorage.getItem("products")) {
            window.localStorage.setItem(
                "products",
                JSON.stringify(data.productRequests)
            );
        }
    }, []);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(JSON.parse(window.localStorage.getItem("products")));
    }, [window.localStorage.getItem("products")]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main products={products} />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/add-feedback" element={<AddFeedback />} />
            </Routes>
        </div>
    );
}

export default App;
