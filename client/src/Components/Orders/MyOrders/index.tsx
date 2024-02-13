import React, { useEffect, useState } from 'react'
import './style.scss'
import { AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useGetMyOrdersMutation } from '../../../redux/api/orderAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function convertDateFormat(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
}

const MyOrders: React.FC = () => {

    const { user } = useSelector((state) => state.userReducer);
    const [myOrders] = useGetMyOrdersMutation();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const { data } = await myOrders(user._id);
                setOrders(data?.orders || []);
            } catch (error) {
                toast.error('Failed to fetch orders', {
                    autoClose: 1500
                });
            }
        }

        fetchOrders();
    }, [myOrders, user._id]);


    return (
        <section className='tableClass'>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th> Order Id </th>
                            <th> Status </th>
                            <th> Return </th>
                            <th> Amount </th>
                            <th> Payment Method </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders && orders.length !== 0 ?
                                orders.map((value) => (
                                    <tr>
                                        <td> {value._id} </td>
                                        <td> {value.orderStatus} </td>
                                        <td> {convertDateFormat(value.returnDate)} </td>
                                        <td> {value.totalPrice} </td>
                                        <td> {value.paymentMethod} </td>
                                        <td>
                                            <Link to={`/orders/${value._id}`}><AiOutlineEye /></Link>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td> {"_"} </td>
                                    <td> {"_"} </td>
                                    <td> {"_"} </td>
                                    <td> {"_"} </td>
                                    <td> {"_"} </td>
                                    <td>
                                        <Link to="#"><AiOutlineEye /></Link>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </main>
        </section>
    )
}

export default MyOrders