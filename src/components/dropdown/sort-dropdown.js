const SortDropdown = ({ setShowSortDropdown, setRightFilter }) => {
    return (
        <div className="sort-dropdown">
            <div
                className="sort-dropdown-el"
                onClick={() => setRightFilter("Most Upvotes")}
            >
                Most Upvotes
            </div>
            <hr className="sort-dropdown-line" />
            <div
                className="sort-dropdown-el"
                onClick={() => setRightFilter("Least Upvotes")}
            >
                Least Upvotes
            </div>
            <hr className="sort-dropdown-line" />
            <div
                className="sort-dropdown-el"
                onClick={() => setRightFilter("Most Comments")}
            >
                Most Comments
            </div>
            <hr className="sort-dropdown-line" />
            <div
                className="sort-dropdown-el"
                onClick={() => setRightFilter("Least Comments")}
            >
                Least Comments
            </div>
        </div>
    );
};

export default SortDropdown;
