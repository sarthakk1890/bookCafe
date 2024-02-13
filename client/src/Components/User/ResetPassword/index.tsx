import React, { Fragment, useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { toast } from "react-toastify"
import './style.scss'
// import Loading from '../../Layout/Loading'
// import { useDispatch, useSelector } from 'react-redux'
import { FiUnlock, FiLock } from 'react-icons/fi'
// import { clearErrors, resetPassword } from '../../../actions/userAction'
// import MetaData from '../../Layout/MetaData'
import { motion } from 'framer-motion'

const ResetPassword: React.FC = () => {

    // const { token } = useParams();
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        // dispatch(resetPassword(token, myForm));
    }

    // useEffect(() => {

    //     if (error) {
    //         toast.error(error, { autoClose: 3000 });
    //         dispatch(clearErrors());
    //     }

    //     if (success) {
    //         toast.success("Password Updated Successfully", { autoClose: 3000 })
    //         navigate("/login");
    //     }

    // }, [dispatch, error, navigate, success])

    return (
        <Fragment>
            {/* <MetaData title="Change Password" /> */}
            <div className="resetPasswordContainer">
                <div className="center">
                    <div className="resetPasswordBox">
                        <motion.h2
                            initial={{
                                y: '-100%'
                            }}
                            whileInView={{
                                y: 0
                            }}
                            className='resetPasswordHeading'>Reset Password</motion.h2>
                        <form
                            className="resetPasswordForm center"
                            onSubmit={resetPasswordSubmit}
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
                            >
                                <FiUnlock />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            >
                                <FiLock />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </motion.div>

                            <input type="submit" value="Update" className="resetPasswordBtn" />
                        </form>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPassword
