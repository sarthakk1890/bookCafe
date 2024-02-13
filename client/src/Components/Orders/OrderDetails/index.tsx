import React, { useEffect } from "react";
import './style.scss'
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useGetOrderDetailsQuery } from "../../../redux/api/orderAPI";
import { useParams } from "react-router-dom";

const OrderDetails: React.FC = () => {

  function convertDateFormat(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};
  const { id } = useParams();

  const { data, refetch } = useGetOrderDetailsQuery({ id, userId: user?._id });
  console.log(data);

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { deliveryCharge = '_', itemsPrice = '_', totalPrice = '_', shippingInfo = {}, orderItems = [], user: orderUser = {}, orderStatus = "_", createdAt = "_", returnDate = "_", paymentMethod = "_", paymentInfo = {} } = data?.order || {};

  return (
    <section className="orderDetails">
      <main>
        <h1>Order Details</h1>
        <div>
          <h1>Shipping</h1>
          <p>
            <b>Address:</b>
            {`${shippingInfo.roomNumber || "_"} ${shippingInfo.hostel || "_"}`}
          </p>
        </div>
        <div>
          <h1>Contact</h1>
          <p>
            <b>Name:</b>
            {orderUser.name || "_"}
          </p>
        </div>

        <div>
          <h1>Status</h1>
          <p>
            <b>Order Status:</b>
            {orderStatus}
          </p>
          <p>
            <b>Placed At:</b>
            {convertDateFormat(createdAt)}
          </p>
          <p>
            <b>Return Date:</b>
            {convertDateFormat(returnDate)}
          </p>
        </div>

        <div>
          <h1>Payment</h1>
          <p>
            <b>Payment Method:</b>
            {paymentMethod}
          </p>
          <p>
            <b>Payment Reference:</b>{paymentInfo.razorpay_payment_id || "_"}
          </p>
        </div>

        <div>
          <h1>Amount</h1>
          <p>
            <b>Items Total:</b>₹{itemsPrice}
          </p>
          <p>
            <b>Shipping Charges:</b>₹{deliveryCharge}
          </p>
          <p>
            <b>Total Amount:</b>₹{totalPrice}
          </p>
        </div>

        <article>
          <h1>Ordered Items</h1>
          {orderItems.map((value) => (
            <div key={value._id}>
              <h4>{value.name}</h4>
              <div>
                <span>{value.quantity}</span> x <span>{value.price}</span>
              </div>
            </div>
          ))}
          <div>
            <h4
              style={{
                fontWeight: 800,
              }}
            >
              Sub Total
            </h4>
            <div
              style={{
                fontWeight: 800,
              }}
            >
              ₹{itemsPrice}
            </div>
          </div>
        </article>
      </main>
    </section>
  );
};

export default OrderDetails;