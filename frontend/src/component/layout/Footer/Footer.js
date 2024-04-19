import React from 'react'
import './Footer.css'
import logo from '../../../images/logo.png'
import { FaEnvelope, FaGithubSquare, FaGoogle, FaInstagram, FaPaperPlane, FaPhone, FaSearchLocation } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footerSection">
            <div className="container">
                <div className="footer-cta pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i><FaSearchLocation/></i>
                                <div className="cta-text">
                                    <h4>Find us</h4>
                                    <span>1010 lorem ipsum, sit 54321, amet</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i><FaPhone/></i>
                                <div className="cta-text">
                                    <h4>Call us</h4>
                                    <span>+91 9767267043</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i><FaEnvelope/></i>
                                <div className="cta-text">
                                    <h4>Mail us</h4>
                                    <span>gururajgurram1512@info.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 mb-50">
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <a href="index.html"><img src={logo} className="img-fluid" alt="logo" /></a>
                                </div>
                                <div className="footer-text">
                                    <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                        elit,Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className="footer-social-icon">
                                    <span>Follow us</span>
                                    <a href="/"><i className='social-media-icons'><FaGithubSquare/></i></a>
                                    <a href="/"><i className='social-media-icons'><FaInstagram/></i></a>
                                    <a href="/"><i className='social-media-icons'><FaGoogle/></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/">about</a></li>
                                    <li><a href="/">services</a></li>
                                    <li><a href="/">portfolio</a></li>
                                    <li><a href="/">Contact</a></li>
                                    <li><a href="/">About us</a></li>
                                    <li><a href="/">Our Services</a></li>
                                    <li><a href="/">Expert Team</a></li>
                                    <li><a href="/">Contact us</a></li>
                                    <li><a href="/">Latest News</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Subscribe</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                </div>
                                <div className="subscribe-form">
                                    <form action="#">
                                        <input type="text" placeholder="Email Address" />
                                        <button><i><FaPaperPlane/></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2018, All Right Reserved <a href="/">Gururaj</a></p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                            <div className="footer-menu">
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/">Terms</a></li>
                                    <li><a href="/">Privacy</a></li>
                                    <li><a href="/">Policy</a></li>
                                    <li><a href="/">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
