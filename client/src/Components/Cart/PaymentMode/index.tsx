import React, { useEffect, useState } from 'react';
import './style.scss';
import { GiMoneyStack } from 'react-icons/gi';
import { useNewCodOrderMutation, usePaymentVerificationMutation } from '../../../redux/api/orderAPI';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../../assets/heading.png'

const PaymentMode: React.FC = () => {
    const [paymentType, setPaymentType] = useState<string>('');

    const [codOrder] = useNewCodOrderMutation();
    const [paymentVerification] = usePaymentVerificationMutation();

    const navigate = useNavigate();

    const { cartItems, itemsPrice, totalPrice, deliveryCharge, shippingInfo } = useSelector((state) => state.cartReducer);
    const { user } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPaymentType = event.target.value;
        setPaymentType(selectedPaymentType);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (paymentType === 'cod') {
            const myForm = {
                orderItems: cartItems,
                paymentMethod: 'COD',
                itemsPrice: itemsPrice,
                deliveryCharge: deliveryCharge,
                totalPrice: totalPrice,
                shippingInfo
            };

            const requestBody = {
                myForm: myForm,
                userId: user._id,
            };

            try {
                const { data } = await codOrder(requestBody);
                const statusId = data.savedOrder._id;

                toast.success(data.message, {
                    autoClose: 2000
                })

                navigate(`/paymentSuccess/${statusId}`)

            } catch (error) {
                toast.error(`Error occurred while placing order: ${error}`, {
                    autoClose: 2000
                });
            }
        }
        else if (paymentType === 'online') {
            const { data:
                { savedOrder, orderOptions }
            } = await axios.post(
                `${import.meta.env.VITE_SERVER}/api/v1/order/new/online?id=${user._id}`,
                {
                    orderItems: cartItems,
                    paymentMethod: 'Online',
                    itemsPrice: itemsPrice,
                    deliveryCharge: deliveryCharge,
                    totalPrice: totalPrice,
                    shippingInfo
                }
            )

            const options = {
                key: "rzp_test_nS4OygGNqxTFN8",
                amount: savedOrder.amount,
                currency: "INR",
                name: "Book Cafe",
                description: "This is BookCafe transaction page",
                image: { logo },
                order_id: savedOrder.id,
                handler: async function (response) {

                    const myForm = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        orderOptions
                    };

                    const requestBody = {
                        myForm: myForm,
                        userId: user._id,
                    };

                    const { data } = await paymentVerification(requestBody);
                    // console.log(data);
                    const statusId = data.savedOrder._id;

                    toast.success("Order placed successfully", {
                        autoClose: 2000
                    })

                    navigate(`/paymentSuccess/${statusId}`)

                },
                theme: {
                    color: "#e1dd7c"
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();

        }
    };


    return (
        <section className="confirmOrder">
            <main>
                <h1>
                    <GiMoneyStack /> Payment Mode
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Cash On Delivery</label>
                        <input type="radio" name="payment" value="cod" onChange={(e) => handlePaymentChange(e)} />
                    </div>
                    <div>
                        <label>Online</label>
                        <input type="radio" name="payment" value="online" onChange={(e) => handlePaymentChange(e)} />
                    </div>

                    <button type="submit">Place Order</button>
                </form>
            </main>
        </section>
    );
};

export default PaymentMode;
