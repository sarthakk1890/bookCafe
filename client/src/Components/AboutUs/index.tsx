import React from 'react';
import './style.scss';
import profileImage from '../../assets/profile.jpg';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import {  motion } from 'framer-motion'
import Sarthak from '../../assets/sarthak.jpg'
import Vishwaraj from '../../assets/vishwaraj02.jpg'

const About: React.FC = () => {

    const option1 = {
        initial: {
            y: "-100%",
            opacity: 0
        },
        whileInView: {
            y: 0,
            opacity: 1
        },
        transition: {
            delay: 0.5
        }
    }
    const option2 = {
        initial: {
            opacity: 0
        },
        whileInView: {
            opacity: 1
        },
        transition: {
            delay: 0.8
        }
    }
    const option3 = {
        initial: {
            x: "-100%",
            opacity: 0
        },
        whileInView: {
            x: 0,
            opacity: 1
        }
    }

    const team = [
        {
            name: "Vishwaraj Singh",
            image: Vishwaraj,
            designation: "Owner1",
            linkedIn: "https://www.linkedin.com/in/vishwaraj2011",
            github: "https://github.com/vishwaraj14"
        },
        {
            name: "Dummy Name",
            image: profileImage,
            designation: "Owner2",
            linkedIn: "",
            github: ""
        },
        {
            name: "Sarthak Singh",
            image: Sarthak,
            designation: "Developer",
            linkedIn: "https://www.linkedin.com/in/sarthak-singh-38261b225/",
            github: "https://github.com/sarthakk1890"
        },
    ]

    return (
        <section className='about'>
            <div className="about-1">
                <motion.h1 {...option3}>
                    Welcome to Book Cafe
                </motion.h1>
                <motion.a {...option1} href='#our-team'>
                    Meet our Team
                </motion.a>
            </div>

            <div className="about-2 center">
                <div className="about-us-01 center">
                    <div className='center' style={{ flex: '3' }}>
                        <motion.h1 {...option1}>
                            Our Vision
                        </motion.h1>
                    </div>
                    <div className='center' style={{ flex: '7' }}>
                        <motion.p {...option2}>
                            At Book Cafe, we're passionate about fostering a dynamic learning environment for readers through
                            the power of literature and community. Founded by a group of enthusiastic college students, our
                            venture emerged from a shared love for books and a desire to create a space where readers can explore,
                            connect, and grow.
                        </motion.p>
                    </div>
                </div>
                <div className="about-us-02 center">
                    <div className='center' style={{ flex: '3' }}>
                        <motion.h1 {...option1}>
                            Our Mission
                        </motion.h1>
                    </div>
                    <div className='center' style={{ flex: '7' }}>
                        <motion.p {...option2}>
                            Our mission is to provide readers with a cozy haven where they can indulge in their love for reading,
                            exchange ideas, and engage in meaningful conversations. We believe in the transformative power of books
                            to inspire, educate, and entertain, and we're committed to curating a diverse selection of titles that
                            cater to the varied interests and academic pursuits of our readers community.
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="about-3 center" id='our-team'>
                <h1>Meet the team</h1>
                <div className="team center">
                    {
                        team.map((value, idx) => (
                            <div className="about-card" key={idx} style={{ backgroundImage: `url(${value.image})` }}>
                                <div className="team-details">
                                    <div className="dash">
                                    </div>
                                    <div className="team-name" style={{ flex: '3' }}>
                                        <h2>
                                            {value.name}
                                        </h2>
                                    </div>
                                    <div className="team-designation" style={{ flex: '2' }}>
                                        <p>
                                            {value.designation}
                                        </p>
                                    </div>
                                    <div className="team-social center" style={{ flex: '5' }}>
                                        <a href={value.linkedIn} target="_blank">
                                            <FaLinkedin />
                                        </a>
                                        <a href={value.github} target="_blank">
                                            <FaGithub />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section >
    );
};

export default About;
