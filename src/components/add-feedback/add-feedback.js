import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddFeedback = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            id: uuidv4(),
            title: e.target.text.value,
            category: "feature",
            upvotes: 0,
            status: "suggestion",
            description: e.target.textarea.value,
            comments: [],
        };

        const allProducts = JSON.parse(window.localStorage.getItem("products"));

        allProducts.push(newProduct);
        window.localStorage.setItem("products", JSON.stringify(allProducts));
    };

    return (
        <div className="add-feedback">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="add-feedback-link">Go Back</div>
            </Link>

            <div className="add-feedback-main">
                <div className="add-feedback-plus">+</div>
                <div className="add-feedback-header header-large">
                    Create New Feedback
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
                        />
                    </div>

                    <div className="add-feedback-form__el">
                        <label
                            htmlFor="select"
                            className="add-feedback-form__label_main"
                        >
                            Category
                        </label>
                        <label
                            htmlFor="select"
                            className="add-feedback-form__label_secondary"
                        ></label>
                        <select
                            name="select"
                            id="select"
                            className="add-feedback-form__select"
                        >
                            Choose a category for your feedback
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
                        ></textarea>
                    </div>

                    <div className="add-feedback-form__buttons">
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <button className="add-feedback-form__button">
                                Cancel
                            </button>
                        </Link>
                        <button
                            className="add-feedback-form__button"
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

export default AddFeedback;
