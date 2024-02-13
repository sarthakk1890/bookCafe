import React from 'react';
import './style.scss';
import ProductCard from '../ProductCard';
import { useGetFeaturedProductsQuery } from '../../../redux/api/productAPI';
import { Products } from '../../../types/types';

const FeaturedProducts: React.FC = () => {
  const { data } = useGetFeaturedProductsQuery("");

  // Check if data and products are defined before sorting
  const topSixProducts = data?.products

  return (
    <section id="featured_products">
      <h1>Featured Books</h1>
      <div>
        {topSixProducts?.map((product: Products, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
