import React from 'react';
import { Link } from 'react-router-dom';

import 'components/Header/Header.css';

const Header = () => {
    return (
        <div className='header-container'>
            <div className='header-content'>
                <Link className='header-logo' to='/' >Cookbook</Link>
                <Link className='header-links' to='/myRecipes' >My recipes</Link>
            </div>
        </div>
    );
}

export default Header;
