import React, { useEffect, useState } from 'react';
import './style.scss';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { FaPhoneAlt } from 'react-icons/fa';
import { BsFillBuildingsFill, BsFillDoorOpenFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../../redux/reducer/cartReducer';
import { useNavigate } from 'react-router-dom';

const Shipping: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, shippingInfo } = useSelector((state) => state.cartReducer);

    const [hostel, setHostel] = useState(shippingInfo.hostel || "");
    const [roomNumber, setRoomNumber] = useState(shippingInfo.roomNumber || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ hostel, roomNumber, phoneNo })); // Updated roomNo to roomNumber and phone to phoneNo
        navigate('/paymentMode');
    };
    
    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate])

    return (
        <section className="shipping">
            <main>
                <h1>
                    <motion.span
                        initial={{
                            x: '-300%',
                            opacity: 0
                        }}
                        whileInView={{
                            x: '-5%',
                            opacity: 1
                        }}
                        transition={{ delay: 0.2 }}
                    >
                        <LiaShippingFastSolid />
                    </motion.span>
                    Shipping Details
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label><BsFillBuildingsFill /> Hostel</label>
                        <input
                            type="text"
                            placeholder='Enter your hostel name'
                            value={hostel}
                            onChange={(e) => setHostel(e.target.value)}
                        />
                    </div>
                    <div>
                        <label><BsFillDoorOpenFill /> Room No.</label>
                        <input
                            type="text"
                            placeholder='Enter your room number'
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)} // Updated roomNo to roomNumber
                        />
                    </div>
                    <div>
                        <label><FaPhoneAlt /> Phone No.</label>
                        <input
                            type="text"
                            placeholder='Enter your phone number'
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)} // Updated phone to phoneNo
                        />
                    </div>
                    <button type="submit">Confirm Order</button>
                </form>
            </main>
        </section>
    );
};

export default Shipping;
