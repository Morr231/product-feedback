import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import RoadmapCard from "./roadmap-comp/roadmap-card";

const Roadmap = ({ products }) => {
    const [planned, setPlanned] = useState([]);

    const [inProgress, setInProgress] = useState([]);

    const [live, setLive] = useState([]);

    useEffect(() => {
        setPlanned(products.filter((el) => el.status === "planned"));
        setInProgress(products.filter((el) => el.status === "in-progress"));
        setLive(products.filter((el) => el.status === "live"));
    }, [products]);

    return (
        <div className="roadmap">
            <div
                className="main-right__header"
                style={{ marginBottom: "5rem" }}
            >
                <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <div
                        className="add-feedback-link"
                        style={{ marginBottom: 0 }}
                    >
                        Go Back
                    </div>
                </Link>

                <div className="header-large">Roadmap</div>

                <Link to="add-feedback">
                    <button className="main-right__header_button">
                        + Add Feedback
                    </button>
                </Link>
            </div>

            <div className="roadmap-main">
                <div className="roadmap-cards">
                    <div className="header-large mar-b-small">
                        Planned ({planned.length})
                    </div>
                    <div className="main-card-description mar-b-large">
                        Ideas prioritized for research
                    </div>

                    <div className="roadmap-cards-container">
                        {planned.map((el) => (
                            <RoadmapCard product={el} color="#F49F85" />
                        ))}
                    </div>
                </div>

                <div className="roadmap-cards">
                    <div className="header-large mar-b-small">
                        In-Progress ({inProgress.length})
                    </div>
                    <div className="main-card-description mar-b-large">
                        Currently being developed
                    </div>

                    <div className="roadmap-cards-container">
                        {inProgress.map((el) => (
                            <RoadmapCard product={el} color="#AD1FEA" />
                        ))}
                    </div>
                </div>

                <div className="roadmap-cards">
                    <div className="header-large mar-b-small">
                        Live ({inProgress.length})
                    </div>
                    <div className="main-card-description mar-b-large">
                        Released features
                    </div>

                    <div className="roadmap-cards-container">
                        {live.map((el) => (
                            <RoadmapCard product={el} color="#62BCFA" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
