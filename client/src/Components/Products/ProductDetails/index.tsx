import React, { Fragment, useEffect, useState } from 'react';
import './style.scss';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { useAddReviewMutation, useGetSingleProductQuery } from '../../../redux/api/productAPI';
import ReviewCard from '../ReviewCard';
import { useDispatch, useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/reducer/cartReducer';

const ProductDetails: React.FC = () => {

  const { id } = useParams();
  const [review] = useAddReviewMutation();
  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};
  const { data, refetch } = useGetSingleProductQuery(id || '');
  const product = data?.product;

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [productRating, setProductRating] = useState(product?.ratings || 0);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);


  const options = {
    size: 'large' as const,
    value: productRating,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product && product.stock && quantity < product.stock) {
      const qty = quantity + 1;
      setQuantity(qty);
    }
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };


  const addToCartHandler = () => {
    if (product && product.stock <= 0) {
      toast.error("Item out of stock");
    } else {

      const cartItem = {
        product: id,
        image: product?.image,
        name: product?.name,
        price: product?.price,
        quantity: quantity,
        stock: product?.stock,
        returnDays: product?.returnDays,
      }
      dispatch(addToCart(cartItem))
      toast.success("Item Added to Cart")
    }
  };


  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = async () => {
    if (!user) {
      toast.error("Please login to submit review");
      return
    }
    if (rating === 0) {
      toast.error('Please select a rating', { autoClose: 2000 });

    } else if (!comment) {
      toast.error('Please enter a comment', { autoClose: 2000 });
    } else {

      const myForm = {
        'rating': rating,
        'comment': comment,
        'productId': id || ''
      }

      const { data: reviewData } = await review({ myForm, userId: user?._id || "" })
      setOpen(false);
      if (reviewData.success) {
        toast.success('Review added successfully', { autoClose: 2000 })
        setIsSuccess(true);
      } else {
        toast.error('Review cannot be added', { autoClose: 2000 })
      }
    }
  };

  useEffect(() => {
    if (product) {
      setProductRating(product.ratings || 0);
    }

    if (isSuccess) {
      setIsSuccess(false);
      refetch();
    }
  }, [product, isSuccess, refetch]);

  return (

    <Fragment>
      <div className="productDetails">
        <div className="productImage">
          {product?.image ?
            <img src={product?.image} alt="" /> : <h4>No image found</h4>}
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product?.name.toUpperCase()}</h2>
            <p>Product # {product?._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating {...options} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
            <span className="detailsBlock-2-span">({product?.numberOfReviews} Reviews)</span>
          </div>

          <div className="detailsBlock-3">
            <h1>{`₹${product?.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                  -
                </button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button onClick={addToCartHandler}>
                Add to Cart
              </button>
            </div>
            <p>
              Status:
              <b className={product && product.stock! < 1 ? 'redColor' : 'greenColor'}>
                {product && product.stock! < 1 ? ' Out of Stock' : ' In Stock'}
              </b><br />
              Returning Time:
              <b>
                {` ${product?.returnDays} Days`}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product?.description}</p><br />
          </div>

          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>

      <h3 className="reviewsHeading"> REVIEWS </h3>
      <div className="reviewMain">
        <div className={product?.reviews && product.reviews.length > 0 ? "reviews" : "noReviews"}>
          {
            product?.reviews && product.reviews.length > 0 ?
              <>
                {product.reviews.map((value, index) => (
                  <ReviewCard key={index} name={value?.name} comment={value?.comment} rating={value?.rating} />
                ))}
              </> : <p>No reviews</p>
          }
        </div>
      </div>


      <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog noScroll">
          <Rating
            onChange={(e) => setRating(Number(e.target.value))}
            value={rating}
            size="large"
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            precision={0.5}
          />

          <textarea
            className="submitDialogTextArea"
            cols={30}
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ProductDetails;
