import React from 'react';
import { Link } from 'react-router-dom';
import { Products } from '../../../types/types';

interface ProductCardProps {
    product: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, image: booksrc, price, _id: productId } = product;

    return (
        <div className="productCard">
            <Link to={`/product/${productId}`}>
                <div className="cardImage">
                    <img src={booksrc} alt={name} />
                </div>
                <div className="namePrice">
                    <div className="namePrice-1">
                        <h4>{name.toUpperCase()}</h4>
                        <p>ProductId: {productId}</p>
                    </div>
                    <h3>₹ {price}</h3>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
