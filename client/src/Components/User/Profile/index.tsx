import React, { Fragment } from 'react';
import './style.scss';
import UserImg from '../../../assets/avatarPreview.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';


const Profile: React.FC = () => {

    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};

    const option = {
        initial: {
            y: "-100%",
            opacity: 0,
        },
        whileInView: {
            y: 0,
            opacity: 1,
        }
    }

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Logged Out successfully",{autoClose: 1000});
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error during logout: ${error.message}`);
            } else {
                toast.error(`Unknown error during logout: ${error}`);
            }
        }
    };



    return (
        <Fragment>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={user?.photo || UserImg} alt="Preview" />
                    {/* <Link to="/me/update">Edit Profile</Link> */}
                    <Link to="#" onClick={() => logoutHandler()}>Logout</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <motion.p {...option} transition={{ delay: 0.1 }}>{user?.name}</motion.p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <motion.p {...option} transition={{ delay: 0.3 }}>{user?.email}</motion.p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <motion.p {...option} transition={{ delay: 0.6 }}>{String(user?.createdAt).substring(0, 10)}</motion.p>
                    </div>
                    <div>
                        <Link to="/myorders">My Orders</Link>
                        {/* <Link to="/password/update">Change Password</Link> */}
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default Profile;
