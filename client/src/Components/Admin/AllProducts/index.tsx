import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import { Link } from "react-router-dom";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import { useDeleteProductAdminMutation, useGetAllProductAdminQuery } from '../../../redux/api/productAPI';
import { toast } from 'react-toastify';

const AllProducts: React.FC = () => {
    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};

    const { data, refetch } = useGetAllProductAdminQuery(user?._id || "");
    const products = data?.products;

    const [DeleteProduct] = useDeleteProductAdminMutation();

    useEffect(() => {
        refetch();
    }, [user, refetch]);

    const handleDelete = async (id: string) => {
        try {
            const { data, error } = await DeleteProduct({ id: id || "", userId: user?._id || "" });

            if (data) {
                toast.success("Product deleted successfully");
                refetch();
            } else if (error) {
                toast.error(`Error: ${error.data.message}`);
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    return (
        <section className='tableClass allUsers'>
            <Sidebar />
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products ? (
                            products.map((value) => (
                                <tr key={value._id}>
                                    <td>{value._id}</td>
                                    <td>{value.name.toUpperCase()}</td>
                                    <td>{value.stock}</td>
                                    <td>₹{value.price}</td>
                                    <td style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                                        <Link to={`/admin/product/${value._id}`}>
                                            <MdModeEditOutline />
                                        </Link>
                                        <button onClick={() => handleDelete(value._id)}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
        </section>
    );
};

export default AllProducts;
