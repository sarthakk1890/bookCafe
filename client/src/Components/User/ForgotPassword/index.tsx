import React, { Fragment, useState } from 'react';
// import { toast } from "react-toastify"
import './style.scss';
// import Loading from '../../Layout/Loading'
import { FiMail } from 'react-icons/fi';
// import { useDispatch, useSelector } from 'react-redux'
// import { clearErrors, forgotPassword } from '../../../actions/userAction'
// import MetaData from '../../Layout/MetaData'
import { motion } from 'framer-motion'

const ForgotPassword: React.FC = () => {
    // const dispatch = useDispatch();

    // const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState<string>('');

    const forgotPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email);
        // dispatch(forgotPassword(myForm));
    };

    // useEffect(() => {

    //     if (error) {
    //         toast.error(error, { autoClose: 3000 });
    //         dispatch(clearErrors());
    //     }

    //     if (message) {
    //         toast.success(message, { autoClose: 3000 })
    //     }

    // }, [error, message, dispatch])

    return (
        <Fragment>
            {/* <MetaData title="Forgot Password" /> */}
            <div className="forgotPasswordContainer">
                <div className="center">
                    <div className="forgotPasswordBox">
                        <motion.h2
                            initial={{
                                y: '-100%'
                            }}
                            whileInView={{
                                y: 0
                            }}
                            className="forgotPasswordHeading">Forgot Password</motion.h2>
                        <form className="forgotPasswordForm center" onSubmit={forgotPasswordSubmit}>
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
                                className="forgotPasswordEmail">
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

                            <input type="submit" value="Send " className="forgotPasswordBtn" />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ForgotPassword;
