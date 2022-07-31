import { useState } from "react";

import { useLocation, Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../store/userUpdated";

import MainCard from "../main/main-comp/main-card";
import Comment from "./product-comp/comment";

const Product = ({ products }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [commentText, setCommentText] = useState();

    if (!products.length) {
        return <div>Loading</div>;
    }

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const product = products.filter((el) => el.id === currPath)[0];

    const handleComment = (e) => {
        e.preventDefault();

        const newComment = {
            id: uuidv4(),
            content: e.target.textarea.value,
            user: {
                name: "Jesse Ronda",
                username: "jesse10930",
            },
            replies: [],
        };

        const allProducts = JSON.parse(window.localStorage.getItem("products"));

        allProducts
            .filter((el) => el.id === product.id)[0]
            .comments.push(newComment);

        window.localStorage.setItem("products", JSON.stringify(allProducts));

        dispatch(userUpdatedActions.setUserUpdated());
    };

    return (
        <div className="product">
            <div className="product-upper mar-b-large">
                <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <div
                        className="add-feedback-link"
                        style={{ marginBottom: "0" }}
                    >
                        Go Back
                    </div>
                </Link>
                <Link
                    to={`edit`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    state={{ product: product }}
                >
                    <button className="product-edit">Edit feedback</button>
                </Link>
            </div>

            <div className="product-main mar-b-large">
                <MainCard
                    upvotes={product.upvotes}
                    title={product.title}
                    category={product.category}
                    description={product.description}
                    comments={product.comments}
                    id={product.id}
                />
            </div>

            <div className="product-comments mar-b-large">
                <div className="header-large mar-b-large">
                    {product.comments.length} Comments
                </div>

                {product.comments.map((el, index) => (
                    <>
                        <Comment
                            key={el.id}
                            productId={product.id}
                            commentId={el.id}
                            text={el.content}
                            name={el.user.name}
                            username={el.user.username}
                            replies={el.replies}
                        />
                        {index != product.comments.length - 1 && (
                            <hr className="comment-line" />
                        )}
                    </>
                ))}
            </div>

            <div className="product-add-comment">
                <div className="header-large mar-b-large">Add Comment</div>

                <form
                    className="product-add-comment__form"
                    onSubmit={handleComment}
                >
                    <textarea
                        name="textarea"
                        id="textarea"
                        className="add-feedback-form__textarea"
                        placeholder="Type your comment here"
                        cols="30"
                        rows="7"
                        maxLength="250"
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>

                    <div className="product-add-comment-bottom">
                        <div className="product-add-comment__limit">
                            {commentText ? 250 - commentText.length : 250}{" "}
                            Characters Left
                        </div>
                        <button
                            className="feedback-submit add-feedback-form__button"
                            type="submit"
                        >
                            Add Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Product;
