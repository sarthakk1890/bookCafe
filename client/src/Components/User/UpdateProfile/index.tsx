import React, { Fragment, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import './style.scss';
// import Loading from '../../Layout/Loading';
import { MdFaceRetouchingNatural } from 'react-icons/md';
import { FiMail } from 'react-icons/fi';
import avat from '../../../assets/avatarPreview.png';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearErrors, loadUser, updateProfile } from '../../../actions/userAction';
// import { UPDATE_PROFILE_RESET } from '../../../constants/userConstant';
// import MetaData from '../../Layout/MetaData';
import { motion } from 'framer-motion'

const UpdateProfile: React.FC = () => {
    //   const navigate = useNavigate();
    //   const dispatch = useDispatch();

    //   const { user } = useSelector((state) => state.user);
    //   const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [avatar, setAvatar] = useState<string>(avat);
    const [avatarPreview, setAvatarPreview] = useState<string>(avat);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const updateProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('avatar', avatar);
        // dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result as string);
                setAvatar(reader.result as string);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    //   useEffect(() => {
    //     if (user) {
    //       setName(user.name);
    //       setEmail(user.email);
    //       setAvatarPreview(user.avatar.url);
    //     }

    //     if (error) {
    //       toast.error(error, { autoClose: 3000 });
    //       dispatch(clearErrors());
    //     }

    //     if (isUpdated) {
    //       toast.success('Profile Updated Successfully', { autoClose: 3000 });
    //       dispatch(loadUser());
    //       navigate('/account');

    //       dispatch({
    //         type: UPDATE_PROFILE_RESET,
    //       });
    //     }
    //   }, [dispatch, error, navigate, isUpdated, user]);

    return (
        <Fragment>
            {/* <MetaData title="Update Profile" /> */}
            <div className="UpdateProfileContainer">
                <div className="center">
                    <div className="UpdateProfileBox">
                        <motion.h2
                            initial={{
                                y: '-100%',
                                opacity: 0
                            }}
                            whileInView={{
                                y: 0,
                                opacity: 1
                            }}
                            className="UpdateProfileHeading">Update Profile</motion.h2>
                        <form
                            className="UpdateProfileForm center"
                            encType="multipart/form-data"
                            onSubmit={updateProfileSubmit}
                        >
                            <motion.div
                                initial={{
                                    x: '-100%',
                                    opacity: 0
                                }}
                                whileInView={{
                                    x: 0,
                                    opacity: 1
                                }}
                                transition={{
                                    delay: 0.3
                                }}
                                className="UpdateProfileName">
                                <MdFaceRetouchingNatural />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </motion.div>
                            <motion.div
                                initial={{
                                    x: '100%',
                                    opacity: 0
                                }}
                                whileInView={{
                                    x: 0,
                                    opacity: 1
                                }}
                                transition={{
                                    delay: 0.5
                                }}
                                className="UpdateProfileEmail">
                                <FiMail />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </motion.div>

                            <motion.div
                                initial={{
                                    x: '-100%',
                                    opacity: 0
                                }}
                                whileInView={{
                                    x: 0,
                                    opacity: 1
                                }}
                                transition={{
                                    delay: 0.7
                                }}
                                id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                />
                            </motion.div>
                            <input type="submit" value="Update Profile" className="UpdateProfileBtn" />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProfile;
