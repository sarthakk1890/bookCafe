import React from 'react'
import './style.scss'
import Sidebar from '../Sidebar'
// import { Link } from "react-router-dom";
// import { MdModeEditOutline, MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import { useGetAllUserADminQuery } from '../../../redux/api/userAPI';

const AllUsers: React.FC = () => {

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};
    const { data } = useGetAllUserADminQuery(user?._id || "");
    const users = data?.users;


    // const deleteUserHandler = (userId: string) => {
    //     return userId;
    // }

    return (
        <section className='tableClass allUsers'>
            <Sidebar />
            <main>
                <table>
                    <thead>
                        <tr>
                            <th> User Id </th>
                            <th> Name </th>
                            <th> Avatar </th>
                            <th> Role </th>
                            <th> Since </th>
                            {/* <th> Action </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users ?
                                users.map((value) => (
                                    <tr>
                                        <td> {value._id} </td>
                                        <td> {value.name} </td>
                                        <td>
                                            <img src={value.photo} alt="" />
                                        </td>
                                        <td> {value.role.toUpperCase()} </td>
                                        <td> {formatDate(value.createdAt)} </td>
                                        {/* <td className='userActionBtn'>
                                            <Link to={`/admin/user/${value._id}`}>
                                                <MdModeEditOutline />
                                            </Link>
                                            <button onClick={() => deleteUserHandler(value._id)}>
                                                <MdDelete />
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan={5}>No users found</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </main>
        </section>
    )
}

export default AllUsers