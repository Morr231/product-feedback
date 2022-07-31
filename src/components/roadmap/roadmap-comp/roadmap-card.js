import { useState } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../../store/userUpdated";

import MainButton from "../../buttons/main-button";

const RoadmapCard = ({ color, product }) => {
    const { title, description, category, upvotes, comments, id } = product;

    const dispatch = useDispatch();

    const [upvoteClicked, setUpvoteClicked] = useState(false);

    const handleUpvote = () => {
        const allProducts = JSON.parse(window.localStorage.getItem("products"));

        const currProduct = allProducts.filter((el) => el.id === id)[0];

        if (!upvoteClicked) {
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
        <div
            className="roadmap-card"
            style={{ borderTop: `0.8rem solid ${color}` }}
        >
            <div className="main-roadmap-number__container mar-b-large">
                <div
                    className={`main-roadmap-number-icon ${
                        color === "#F49F85"
                            ? "planned-circle"
                            : color === "#AD1FEA"
                            ? "in-progress-circle"
                            : "live-cirlce"
                    }`}
                ></div>

                <div className="main-roadmap-number-text">
                    {color === "#F49F85"
                        ? "Planned"
                        : color === "#AD1FEA"
                        ? "In-Progress"
                        : "Live"}
                </div>
            </div>
            <Link
                to={`/product/${id}`}
                state={{ product: product }}
                style={{
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                <div className="main-card-title header-large">{title}</div>
            </Link>
            <div
                className="main-card-description"
                style={{ marginBottom: "2rem" }}
            >
                {description}
            </div>
            <div className="main-card-category mar-b-large">{category}</div>

            <div className="roadmap-card-bottom">
                <div className="main-card-upvotes">
                    <MainButton
                        text={upvotes}
                        upvote={true}
                        action={handleUpvote}
                    />
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
        </div>
    );
};

export default RoadmapCard;
