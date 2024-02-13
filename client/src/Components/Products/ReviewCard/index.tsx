import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

interface ReviewCardProps {
  name: string;
  comment: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, comment, rating }) => {


  const options = {
    size: 'medium' as const,
    value: rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <h3>{name}</h3>
      <div className="rating">
        <Rating {...options} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
      </div>
      <p>{comment}</p>
    </div>
  );
}

export default ReviewCard;
