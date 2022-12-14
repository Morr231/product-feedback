import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import MainButton from "../buttons/main-button";
import SortDropdown from "../dropdown/sort-dropdown";

import MainCard from "./main-comp/main-card";

const Main = ({ products }) => {
    const [rightFilter, setRightFilter] = useState("Most Upvotes");
    const [leftFilter, setLeftFilter] = useState("all");

    const [showSortDropdown, setShowSortDropdown] = useState(false);

    return (
        <div className="main">
            <div className="main-container">
                <div className="main-left mar-r-large">
                    <div className="main-left__header mar-b-large">
                        <div className="main-left__header_el"></div>
                        <div className="main-left__header_el"></div>
                        <div className="main-left__header_el header-large mar-b-small">
                            Frontend Mentor
                        </div>
                        <div className="main-left__header_el header-small">
                            Feedback Board
                        </div>
                    </div>

                    <div className="main-left__filter mar-b-large">
                        <MainButton
                            text="all"
                            active={
                                leftFilter === "all" ? "all" : "placeholder"
                            }
                            action={() => setLeftFilter("all")}
                        />
                        <MainButton
                            text="enhancement"
                            active={
                                leftFilter === "enhancement"
                                    ? "all"
                                    : "placeholder"
                            }
                            action={() => setLeftFilter("enhancement")}
                        />
                        <MainButton
                            text="bug"
                            active={
                                leftFilter === "bug" ? "all" : "placeholder"
                            }
                            action={() => setLeftFilter("bug")}
                        />
                        <MainButton
                            text="feature"
                            active={
                                leftFilter === "feature" ? "all" : "placeholder"
                            }
                            action={() => setLeftFilter("feature")}
                        />
                    </div>

                    <div className="main-roadmap">
                        <div className="main-roadmap-top mar-b-large">
                            <div className="main-roadmap-header header-large">
                                Roadmap
                            </div>
                            <Link to="/roadmap">
                                <div className="main-roadmap-link">View</div>
                            </Link>
                        </div>

                        <div className="main-roadmap-numbers">
                            <div className="main-roadmap-number">
                                <div className="main-roadmap-number__container">
                                    <div className="main-roadmap-number-icon planned-circle"></div>
                                    <div className="main-roadmap-number-text">
                                        Planned
                                    </div>
                                </div>
                                <div className="main-roadmap-number-main">
                                    {
                                        products.filter(
                                            (el) => el.status === "planned"
                                        ).length
                                    }
                                </div>
                            </div>
                            <div className="main-roadmap-number">
                                <div className="main-roadmap-number__container">
                                    <div className="main-roadmap-number-icon in-progress-circle"></div>
                                    <div className="main-roadmap-number-text">
                                        In-Progress
                                    </div>
                                </div>
                                <div className="main-roadmap-number-main">
                                    {
                                        products.filter(
                                            (el) => el.status === "in-progress"
                                        ).length
                                    }
                                </div>
                            </div>
                            <div className="main-roadmap-number">
                                <div className="main-roadmap-number__container">
                                    <div className="main-roadmap-number-icon live-cirlce"></div>
                                    <div className="main-roadmap-number-text">
                                        Live
                                    </div>
                                </div>
                                <div className="main-roadmap-number-main">
                                    {
                                        products.filter(
                                            (el) => el.status === "live"
                                        ).length
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-right">
                    <div className="main-right__header mar-b-large">
                        <div className="main-right__suggestions_number header-large">
                            6 Suggestions
                        </div>

                        <div className="main-right__header_sort">
                            {showSortDropdown && (
                                <SortDropdown
                                    setshowSortDropdown={setShowSortDropdown}
                                    setRightFilter={setRightFilter}
                                />
                            )}
                            <div
                                className="main-right__header_sort_container"
                                onClick={() =>
                                    setShowSortDropdown(!showSortDropdown)
                                }
                            >
                                <div className="main-right__header_sort_text">
                                    Sort by:
                                </div>
                                <div className="main-right__header_sort_dropdown">
                                    <></>
                                    <div className="main-right__header_sort_dropdown_text">
                                        {rightFilter}
                                    </div>
                                    &#8595;
                                </div>
                            </div>
                        </div>

                        <Link to="add-feedback">
                            <button className="main-right__header_button">
                                + Add Feedback
                            </button>
                        </Link>
                    </div>
                    <div className="main-right__cards">
                        {[...products]
                            .sort((a, b) => {
                                let sortBy = rightFilter.split(" ")[1];

                                if (
                                    (sortBy === "Comments" &&
                                        a.comments.length >
                                            b.comments.length) ||
                                    (sortBy === "Upvotes" &&
                                        a.upvotes > b.upvotes)
                                ) {
                                    return rightFilter.split(" ")[0] === "Most"
                                        ? -1
                                        : 1;
                                }
                                if (
                                    (sortBy === "Comments" &&
                                        a.comments.length <
                                            b.comments.length) ||
                                    (sortBy === "Upvotes" &&
                                        a.upvotes < b.upvotes)
                                ) {
                                    return rightFilter.split(" ")[0] === "Most"
                                        ? 1
                                        : -1;
                                }
                                return 0;
                            })
                            .filter((el) => {
                                if (leftFilter === "all") return el;
                                return el.category === leftFilter;
                            })
                            .map((el) => (
                                <MainCard
                                    key={el.id}
                                    upvotes={el.upvotes}
                                    title={el.title}
                                    category={el.category}
                                    description={el.description}
                                    comments={el.comments}
                                    id={el.id}
                                    upvoted={el.upvoted}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
