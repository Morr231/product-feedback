import { useState } from "react";

import Reply from "./reply";

import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../../store/userUpdated";

const Comment = ({ commentId, productId, name, username, text, replies }) => {
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
        <div className="comment">
            <div className="comment-left">
                <div className="comment-img"></div>
                {replies && replies.length != 0 && (
                    <div className="comment-line-vertical"></div>
                )}
            </div>

            <div className="comment-info">
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
                <div className="comment-text mar-b-large">{text}</div>

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

                {replies &&
                    replies.map((el) => (
                        <Reply
                            commentId={commentId}
                            productId={productId}
                            name={el.user.name}
                            username={el.user.username}
                            replyingTo={el.replyingTo}
                            content={el.content}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Comment;
