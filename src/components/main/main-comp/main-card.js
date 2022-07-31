import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../../store/userUpdated";

import MainButton from "../../buttons/main-button";

const MainCard = ({
    upvotes,
    title,
    category,
    description,
    comments,
    id,
    upvoted,
}) => {
    const dispatch = useDispatch();

    const [upvoteClicked, setUpvoteClicked] = useState(false);

    const handleUpvote = () => {
        const allProducts = JSON.parse(window.localStorage.getItem("products"));

        const currProduct = allProducts.filter((el) => el.id === id)[0];

        if (!upvoteClicked && currProduct.upvoted) {
            currProduct.upvotes++;
            currProduct.upvoted = true;
            setUpvoteClicked(true);
        } else {
            currProduct.upvotes--;
            currProduct.disvoted = true;
            setUpvoteClicked(false);
        }

        window.localStorage.setItem("products", JSON.stringify(allProducts));

        dispatch(userUpdatedActions.setUserUpdated());
    };

    return (
        <div className="main-card mar-b-large">
            <div className="main-card-upvotes">
                <MainButton
                    text={upvotes}
                    upvote={true}
                    action={handleUpvote}
                    liked={upvoted}
                />
            </div>

            <Link
                to={`product/${id}`}
                style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                }}
            >
                <div className="main-card-container">
                    <div className="main-card-info">
                        <div className="main-card-title header-large">
                            {title}
                        </div>
                        <div className="main-card-description">
                            {description}
                        </div>
                        <div className="main-card-category">{category}</div>
                    </div>
                    <div className="main-card-comments">
                        <FontAwesomeIcon
                            icon={faComment}
                            className="main-card-comments__icon"
                        />
                        <div className="main-card-comments__number">
                            {comments && comments.length}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MainCard;
