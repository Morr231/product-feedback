import { useLocation } from "react-router-dom";

import MainCard from "../main/main-comp/main-card";
import Comment from "./product-comp/comment";

const Product = () => {
    const { state } = useLocation();
    const { product } = state;

    return (
        <div className="product">
            <div className="product-upper mar-b-large"></div>

            <div className="product-main mar-b-large">
                <MainCard
                    upvotes={product.upvotes}
                    title={product.title}
                    category={product.category}
                    description={product.description}
                    comments={product.comments}
                />
            </div>

            <div className="product-comments">
                <div className="header-large mar-b-large">
                    {product.comments.length} Comments
                </div>

                {product.comments.map((el) => (
                    <Comment />
                ))}
            </div>
        </div>
    );
};

export default Product;
