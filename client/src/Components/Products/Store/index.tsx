import React, { useState, useEffect } from 'react';
import './style.scss';
import ProductCard from '../ProductCard';
import { Pagination, Stack, Typography, Select, MenuItem, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useGetAllProductsQuery } from '../../../redux/api/productAPI';

const categories = [
    "Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical Fiction",
    "Non-fiction",
    "Biography",
    "Autobiography",
    "Self-Help",
    "Science",
    "Horror",
    "Adventure",
    "Poetry",
    "Children's",
    "Young Adult",
    "Drama",
    "Comedy",
    "Crime",
    "Fantasy",
    "Manga",
    "Graphic Novel",
    "Cookbook",
    "Travel",
    "History",
    "Philosophy",
    "Religion",
    "Art",
    "Music",
    "Sports",
];

const Store: React.FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const options = {
        emptyIcon: <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />,
    };
    const setCurrentPageNo = (e: number) => {
        setCurrentPage(e);
    };

    const { data, refetch, isLoading } = useGetAllProductsQuery({ currentPage, ratings, category, name: "" });

    useEffect(() => {
        refetch();
    }, [currentPage, refetch, ratings, category]);

    const products = data?.products;

    return (
        <div className='store-main'>
            <div className="productsHeading">
                <h2>Products</h2>
            </div>

            <div className="center">
                {isLoading ? (
                    <CircularProgress style={{ marginTop: '20px' }} />
                ) : (
                    <div className="products">
                        {products && products.length > 0 ? (
                            products.map((product) => <ProductCard key={product._id} product={product} />)
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                )}
            </div>

            <div className="filterBox">
                <div className="filterBox-1">
                    <Typography className="subHead">Genres</Typography>
                    <Select
                        className="genreDrop"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        style={{ maxHeight: '30px', overflowY: 'hidden' }}
                    >
                        <MenuItem value="">All</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="filterBox-2">
                    <Typography className="subHead">Ratings Above</Typography>
                    <div className="center noScroll" style={{ flexDirection: 'column' }}>
                        <Rating
                            {...options}
                            value={ratings}
                            onChange={(_, newValue) => {
                                if (newValue !== null) {
                                    setRatings(newValue);
                                }
                            }}
                        />
                        <button className="reset-rating" onClick={() => setRatings(0)}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {
                products?.length !== 0 && <div className="paginationBox">
                    <Stack spacing={2} direction="row" justifyContent="center">
                        {products && (
                            <Pagination
                                count={Math.ceil(data.productsCount / data.resultPerPage)}
                                page={currentPage}
                                onChange={(_, page) => setCurrentPageNo(page)}
                                color="primary"
                                showFirstButton
                                showLastButton
                            />
                        )}
                    </Stack>
                </div>
            }

        </div>
    );
};

export default Store;
