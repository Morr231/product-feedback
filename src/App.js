import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { userUpdatedActions } from "./store/userUpdated";

import Main from "./components/main";
import Product from "./components/product";
import Roadmap from "./components/roadmap";
import AddFeedback from "./components/add-feedback";
import EditProduct from "./components/edit-product";

import data from "./data";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!window.localStorage.getItem("products")) {
            window.localStorage.setItem(
                "products",
                JSON.stringify(data.productRequests)
            );
        }
    }, []);

    const [products, setProducts] = useState([]);

    const userUpdated = useSelector((state) => state.userUpdated.updated);

    useEffect(() => {
        if (!products.length || userUpdated) {
            setProducts(JSON.parse(window.localStorage.getItem("products")));
        }
        if (userUpdated) {
            dispatch(userUpdatedActions.setUserUpdated());
        }
    }, [userUpdated]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main products={products} />} />
                <Route
                    path="/roadmap"
                    element={<Roadmap products={products} />}
                />
                <Route
                    path="/product/:id"
                    element={<Product products={products} />}
                />
                <Route path="/product/:id/edit" element={<EditProduct />} />
                <Route path="/add-feedback" element={<AddFeedback />} />
            </Routes>
        </div>
    );
}

export default App;
