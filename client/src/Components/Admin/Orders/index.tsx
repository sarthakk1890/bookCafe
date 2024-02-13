import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { GiArmoredBoomerang } from 'react-icons/gi';
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../../redux/api/orderAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa6';

function convertDateFormat(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
}

const AdminOrders: React.FC = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { data, refetch } = useGetAllOrdersQuery(user._id);
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    const handleProcess = async (orderStatus: string, id: string) => {

        if (orderStatus === "Delivered") {
            toast.error("Order already delivered");
            return;
        }

        try {
            await updateOrderStatus({ userId: user?._id || '', id });
            toast.success('Order status updated successfully');
        } catch (error) {
            toast.error('Failed to update order status');
        }
        refetch();
    };

    const handleDelete = async (id: string) => {
        const { data } = await deleteOrder({ userId: user?._id || '', id })
        if (data.success === true) {
            toast.success('Order deleted successfully', {
                autoClose: 1200
            })
            refetch();
        }
        else {
            toast.error('Error deleting order', {
                autoClose: 1200
            })
        }
    }

    const orders = data?.orders;

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <section className="tableClass allUsers">
            <Sidebar />
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Status</th>
                            <th>Return</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && orders?.length !== 0 ? (
                            orders?.map((value) => (
                                <tr key={value._id}>
                                    <td>{value._id}</td>
                                    <td>{value.orderStatus}</td>
                                    <td>{convertDateFormat(value.returnDate)}</td>
                                    <td>₹{value.itemsPrice}</td>
                                    <td>{value.paymentMethod}</td>
                                    <td>{value.user.name}</td>
                                    <td style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                                        <Link to={`/orders/${value._id}`}>
                                            <AiOutlineEye />
                                        </Link>
                                        <button onClick={() => handleProcess(value.orderStatus, value._id)}>
                                            <GiArmoredBoomerang />
                                        </button>
                                        <button onClick={() => handleDelete(value._id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>{'_'}</td>
                                <td>{'_'}</td>
                                <td>{'_'}</td>
                                <td>{'_'}</td>
                                <td>{'_'}</td>
                                <td>{'_'}</td>
                                <td style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link to="#">
                                        <AiOutlineEye />
                                    </Link>
                                    <button>
                                        <GiArmoredBoomerang />
                                    </button>
                                    <button>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
        </section>
    );
};

export default AdminOrders;
