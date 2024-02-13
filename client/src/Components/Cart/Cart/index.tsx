import React, { useEffect, useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { calculatePrice, removeCartItem } from '../../../redux/reducer/cartReducer';
import { BsTrash3Fill } from "react-icons/bs";
import emptyCart from '../../../assets/empty-cart.png';

interface CartItemProps {
    product: string;
    value: number;
    each: number;
    title: string;
    img: string;
}

function truncateText(text: string) {
    if (text.length <= 7) {
        return text;
    } else {
        return text.slice(0, 10) + '...';
    }
}

const CartItem: React.FC<CartItemProps> = ({ product, value, title, img, each }) => {
    const dispatch = useDispatch();

    const handleRemoveItem = () => {
        dispatch(removeCartItem(product));
    };

    return (
        <div className="cartItem">
            <div className='cartProductContainer'>
                <img src={img} alt="" />
                <div>
                    <br />
                    <p>{truncateText(title).toUpperCase()}</p>
                    <br />
                    <div style={{ cursor: 'pointer' }} onClick={handleRemoveItem}>
                        <BsTrash3Fill />
                    </div>
                </div>
            </div>
            <div className='cartEachPrice'>
                <p>Each</p>
                <h4>₹{each}</h4>
            </div>
            <div className="input-container">
                <p>Quantity</p>
                <h4 style={{ textAlign: "center" }}>{value}</h4>
            </div>
            <div className='cartItemTotalPrice'>
                <p>Total</p>
                <h4>₹{value * each}</h4>
            </div>
        </div>
    );
};

const Cart: React.FC = () => {
    const { cartItems, itemsPrice, totalPrice } = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();
    const [delivery, setDelivery] = useState(false);

    useEffect(() => {
        dispatch(calculatePrice(delivery ? 10 : 0));
    }, [delivery, dispatch, cartItems]);

    const handleDeliveryChange = () => {
        setDelivery(!delivery);
    };
    const deliveryCharge = delivery ? 10 : 0;

    return (
        <section className="cart">
            <motion.h1
                initial={{ y: "-100%" }}
                whileInView={{ y: "0%" }}
            >
                <LiaShoppingBagSolid /> My Cart
            </motion.h1>
            {(cartItems && cartItems.length !== 0) ?
                <div>
                    <div className="cartSection-1">
                        <div className="cartSection-1-1">
                            {
                                cartItems.map((value) => (
                                    <CartItem key={value.product} product={value.product} each={value.price} title={value.name} value={value.quantity} img={value.image} />
                                ))
                            }
                        </div>
                        <div className="cartSection-1-2">
                            <h4>{cartItems?.length} items</h4>
                            <h4>₹{itemsPrice}</h4>
                        </div>
                    </div>

                    <div className="cartSection-2">
                        <div className="delivery">
                            <div className="delivery-1">
                                <p>Delivery Charges:</p>
                                <div>
                                    <p>Self pickup</p>
                                    <label className="switch">
                                        <input type="checkbox" onChange={handleDeliveryChange} checked={delivery} />
                                        <span className="slider round"></span>
                                    </label>
                                    <p>Deliver to room</p>
                                </div>
                            </div>
                            <p> ₹{deliveryCharge} </p>
                        </div>
                        <div className="itemsPrice">
                            <p>Sub Total:</p>
                            <p> ₹{itemsPrice}</p>
                        </div>
                        <div className="total">
                            <p>Total:</p>
                            <p> ₹{totalPrice}</p>
                        </div>
                        <div className="checkout">
                            <Link to={delivery ? '/shipping' : '/paymentMode'}>Checkout</Link>
                        </div>
                    </div>
                </div>
                :
                <div className='emptyCart'>
                    <img src={emptyCart} alt="Empty Cart" />
                </div>
            }
        </section>
    );
};

export default Cart;
