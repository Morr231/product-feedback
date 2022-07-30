import { useState } from "react";

const MainButton = ({ text, action, active, upvote }) => {
    const [clickCounter, setClickCounter] = useState(0);

    const handleClick = () => {
        if (action) {
            action();
        }

        setClickCounter(clickCounter + 1);
    };

    return (
        <button
            className={`main-button ${
                active && active !== "placeholder"
                    ? "main-button-active"
                    : !active && clickCounter % 2 != 0
                    ? "main-button-active"
                    : ""
            }`}
            style={upvote && { margin: 0 }}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default MainButton;
