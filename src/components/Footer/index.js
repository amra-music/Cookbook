import React from 'react';
import 'components/Footer/Footer.css';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className="footer-copyright">
                &copy;{new Date().getFullYear() + ' '}
                <a className='social-link' href="https://github.com/amra-music/Cookbook" target='_blank' rel="noreferrer">
                    Amra Musić
                </a>
                . All rights reserved.
            </div>
        </div>
    );
}

export default Footer;
