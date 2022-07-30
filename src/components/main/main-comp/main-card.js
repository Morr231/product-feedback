import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import MainButton from "../../buttons/main-button";

const MainCard = ({ upvotes, title, category, description, comments }) => {
    return (
        <div className="main-card mar-b-large">
            <div className="main-card-upvotes">
                <MainButton text={upvotes} upvote={true} />
            </div>
            <div className="main-card-info">
                <div className="main-card-title header-large">{title}</div>
                <div className="main-card-description">{description}</div>
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
    );
};

export default MainCard;
