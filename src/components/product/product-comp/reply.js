import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../../store/userUpdated";

const Reply = ({
    commentId,
    productId,
    name,
    username,
    replyingTo,
    content,
}) => {
    const dispatch = useDispatch();

    const [showReply, setShowReply] = useState(false);

    const handleReply = (e) => {
        e.preventDefault();

        const newReply = {
            id: uuidv4(),
            content: e.target.textarea.value,
            replyingTo: username,
            user: {
                name: "Jesse Ronda",
                username: "jesse10930",
            },
        };

        const allProducts = JSON.parse(window.localStorage.getItem("products"));

        const comment = allProducts
            .filter((el) => el.id === productId)[0]
            .comments.filter((el) => el.id === commentId)[0];

        if (typeof comment.replies === "undefined") {
            comment.replies = [newReply];
        } else {
            comment.replies.push(newReply);
        }

        window.localStorage.setItem("products", JSON.stringify(allProducts));
        dispatch(userUpdatedActions.setUserUpdated());
    };

    return (
        <div className="comment mar-b-large">
            <div className="comment-img mar-r-large"></div>

            <div className="comment-info" style={{ width: "90%" }}>
                <div className="comment-name">{name}</div>
                <div className="comment-username">
                    <div className="comment-username__text">@{username}</div>
                    <div
                        className="comment-username__reply"
                        onClick={() => setShowReply(!showReply)}
                    >
                        Reply
                    </div>
                </div>
                <div className="comment-text">
                    <span className="comment-text-replying">
                        @{replyingTo}{" "}
                    </span>
                    {content}
                </div>

                {showReply && (
                    <form className="comment-make-reply" onSubmit={handleReply}>
                        <textarea
                            name="textarea"
                            id="textarea"
                            className="add-feedback-form__textarea"
                            placeholder="Type your comment here"
                            cols="30"
                            rows="7"
                            maxLength="250"
                        ></textarea>
                        <button
                            className="add-feedback-form__button feedback-submit"
                            type="submit"
                            style={{ margin: "0 0 0 2rem" }}
                        >
                            Add Feedback
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Reply;
