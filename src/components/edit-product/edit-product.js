import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux/es/exports";
import { userUpdatedActions } from "../../store/userUpdated";

const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { product } = state;

    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);

    const allProducts = JSON.parse(window.localStorage.getItem("products"));
    const changingProduct = allProducts.filter((el) => el.id === product.id)[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        changingProduct.title = e.target.text.value;
        changingProduct.category = e.target.category.value.toLowerCase();
        changingProduct.status = e.target.status.value.toLowerCase();
        changingProduct.description = e.target.textarea.value;

        window.localStorage.setItem("products", JSON.stringify(allProducts));
        dispatch(userUpdatedActions.setUserUpdated());
        navigate("/");
    };

    const handleDelete = (e) => {
        e.preventDefault();

        allProducts.splice(allProducts.indexOf(changingProduct));

        window.localStorage.setItem("products", JSON.stringify(allProducts));
        dispatch(userUpdatedActions.setUserUpdated());
        navigate("/");
    };

    return (
        <div className="add-feedback">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="add-feedback-link">Go Back</div>
            </Link>

            <div className="add-feedback-main">
                <div className="add-feedback-plus edit-product-icon">
                    <FontAwesomeIcon icon={faPen} />
                </div>
                <div className="add-feedback-header header-large">
                    Edit 'Add tags for solutions'
                </div>

                <form className="add-feedback-form" onSubmit={handleSubmit}>
                    <div className="add-feedback-form__el">
                        <label
                            htmlFor="text"
                            className="add-feedback-form__label_main"
                        >
                            Feedback Title
                        </label>
                        <label
                            htmlFor="text"
                            className="add-feedback-form__label_secondary"
                        >
                            Add a short, descriptive headline
                        </label>
                        <input
                            type="text"
                            name="text"
                            className="add-feedback-form__input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="add-feedback-form__el">
                        <label
                            htmlFor="category"
                            className="add-feedback-form__label_main"
                        >
                            Category
                        </label>
                        <label
                            htmlFor="category"
                            className="add-feedback-form__label_secondary"
                        >
                            Choose a category for your feedback
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="add-feedback-form__select"
                        >
                            <option value="Feature">Feature</option>
                            <option value="Enhancement">Enhancement</option>
                            <option value="Bug">Bug</option>
                        </select>
                    </div>

                    <div className="add-feedback-form__el">
                        <label
                            htmlFor="status"
                            className="add-feedback-form__label_main"
                        >
                            Update Status
                        </label>
                        <label
                            htmlFor="status"
                            className="add-feedback-form__label_secondary"
                        >
                            Change feedback state
                        </label>
                        <select
                            name="status"
                            id="status"
                            className="add-feedback-form__select"
                        >
                            <option value="Suggestion">Suggestion</option>
                            <option value="Planned">Planned</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Live">Live</option>
                        </select>
                    </div>

                    <div className="add-feedback-form__el">
                        <label
                            htmlFor="textarea"
                            className="add-feedback-form__label_main"
                        >
                            Feedback Detail
                        </label>
                        <label
                            htmlFor="textarea"
                            className="add-feedback-form__label_secondary"
                        >
                            Include any specific comments on what should be
                            improved, added, etc.
                        </label>
                        <textarea
                            name="textarea"
                            id="textarea"
                            className="add-feedback-form__textarea"
                            cols="30"
                            rows="7"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="add-feedback-form__buttons">
                        <div className="add-feedback-form__buttons_container">
                            <button
                                className="add-feedback-form__delete"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <button className="add-feedback-form__button">
                                Cancel
                            </button>
                        </Link>
                        <button
                            className="add-feedback-form__button feedback-submit"
                            type="submit"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
