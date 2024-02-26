import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import footerImg from '../../../assets/footerHeading.png'

const Footer: React.FC = () => {
    return (

        <div className="footer">

            <div className="row">

                <div className="col">
                    <img src={footerImg} alt="Book Cafe" />
                    <p>
                        Book Cafe is your destination for affordable literary adventures. We believe in the power of books to inspire and enrich lives, which is why we offer a wide selection of titles for rent at budget-friendly prices.
                    </p>
                </div>

                <div className="col">
                    <h3>Location <div className="underline"><span></span></div></h3>
                    <p>Sangamner</p>
                    <p>Maharashtra 422608</p>
                    <p className="email-id">144.book.cafe@gmail.com</p>
                    <h4>+91 9389603522</h4>
                </div>

                <div className="col">
                    <h3>Links <div className="underline"><span></span></div></h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/store">Products</Link></li>
                        <li><Link to="/me">Your Profile</Link></li>
                        <li><Link to="/cart">Your Cart</Link></li>
                    </ul>
                </div>

                <div className="col">
                    <h3>Join Us <div className="underline"><span></span></div></h3>

                    <div className="social-btns">
                        <p>
                            Get the latest book updates first by joining our WhatsApp group!
                        </p>
                        <Link className="btn whatsapp" to="https://chat.whatsapp.com/DfRw5U6xudJH3bkqFIkell">
                            <i className="fa fa-brands fa-whatsapp"></i>
                        </Link>
                    </div>
                </div>

            </div>

            <hr />
            <div className="copyRight">
                <p>©Copyright. All rights reserved</p>
                <p>This website is made by <em><b>Sarthak Singh</b></em></p>
                <div className="social-btns sarthakLinks">
                    <Link className="btn linkedin" to="https://www.linkedin.com/in/sarthak-singh-38261b225/" target="_blank">
                        <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link className="btn github" to="https://github.com/sarthakk1890" target="_blank">
                        <i className="fa fa-github"></i>
                    </Link>
                    <Link className="btn envelope" to="mailto:144singhsarthak@gmail.com">
                        <i className="fa fa-envelope"></i>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Footer;
