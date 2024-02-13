import React from "react";
import { BiError } from "react-icons/bi";
import "./style.scss";
import { Link } from "react-router-dom";

const NotFound:React.FC = () => {
    return (
        <div className="PageNotFound">
            <BiError />

            <p>Page Not Found </p>
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFound;