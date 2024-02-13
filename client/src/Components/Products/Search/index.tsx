import React, { useState, Fragment, FormEvent } from "react";
import "./style.scss";
import { motion } from 'framer-motion'
import { useGetAllProductsQuery } from "../../../redux/api/productAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Search: React.FC = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>("");
    const { data, refetch } = useGetAllProductsQuery({ currentPage: 1, ratings: 0, name: keyword, category: "" });

    const searchSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword.trim() !== "") {
            refetch();
        }
        if (data && data?.products && data.products.length > 0) {
            navigate(`/product/${data.products[0]._id}`)
        } else {
            toast.error("No product found");
        }
    };

    return (
        <Fragment>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <motion.input
                    initial={{
                        x: '-100%'
                    }}
                    whileInView={{
                        x: 0
                    }}
                    transition={{
                        delay: 0.1
                    }}
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;
