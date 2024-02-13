import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useLoginMutation } from '../../../redux/api/userAPI';
import { MessageResponse } from '../../../types/api-types';

const LoginSignUp: React.FC = () => {

  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {

      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        _id: user.uid!,
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        role: "user",
      })

      if ("data" in res) {
        toast.success(res.data.message, { autoClose: 2000 });
        navigate("/");

      } else {
        const message = (res.error as MessageResponse).message;
        toast.error(message);
      }

    } catch (error) {
      toast.error("Login failed");
    }
  }

  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="center">
          <div className="LoginSignUpBox">
            <div className="Google-btn center" onClick={() => loginHandler()}>
              <div className="center"><FcGoogle /></div>
              <div className="center">
                <p>Continue with Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
