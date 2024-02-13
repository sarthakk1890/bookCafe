import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import footerImg from '../../../assets/footerHeading.png'

const Footer:React.FC = () => {
    return (

        <div className="footer">

            <div className="row">

                <div className="col">
                    <img src={footerImg} alt="Book Cafe" />
                    <p>
                        Book Café is your destination for affordable literary adventures. We believe in the power of books to inspire and enrich lives, which is why we offer a wide selection of titles for rent at budget-friendly prices.
                    </p>
                </div>

                <div className="col">
                    <h3>Office <div className="underline"><span></span></div></h3>
                    <p>Random place</p>
                    <p>Random City</p>
                    <p>Random State</p>
                    <p className="email-id">random1234@gmail.com</p>
                    <h4>+91 11111111111</h4>
                </div>

                <div className="col">
                    <h3>Links <div className="underline"><span></span></div></h3>
                    <ul>
                        <li><Link to="#">Home</Link></li>
                        <li><Link to="#">Services</Link></li>
                        <li><Link to="#">Products</Link></li>
                        <li><Link to="#">Your Cart</Link></li>
                    </ul>
                </div>

                <div className="col">
                    <h3>Newsletter <div className="underline"><span></span></div></h3>
                    <form className='newsLetter'>
                        <i className="far fa-envelope"></i>
                        <input type="email" placeholder='Enter your email id' required />
                        <button type='submit'> <i className="fas fa-arrow-right"></i> </button>
                    </form>
                    <div className="social-btns">
                        <Link className="btn linkedin" to="#">
                            <i className="fa fa-linkedin"></i>
                        </Link>
                        <Link className="btn github" to="#">
                            <i className="fa fa-github"></i>
                        </Link>
                        <Link className="btn instagram" to="#">
                            <i className="fa fa-instagram"></i>
                        </Link>
                    </div>
                </div>

            </div>
            <hr />
            <div className="copyRight">
                <p>©Copyright. All rights reserved</p>
            </div>

        </div>
    );
};

export default Footer;
