import React, { useState } from 'react';
import { useUserContext } from 'AppContext';
import { Link, useHistory } from 'react-router-dom';
import { GiCookingPot } from 'react-icons/gi';
import { IoSearchOutline } from 'react-icons/io5';
import Login from 'components/Login';

import 'components/Header/Header.css';

const Header = () => {

    const history = useHistory();

    const { loggedIn } = useUserContext();
    const [searchValue, setSearchValue] = useState('');

    const search = () => {
        if (searchValue !== "") history.push('/search/' + searchValue);
        setSearchValue("");
    }

    const handleSearchInput = () => {
        search();
    }

    const onEnter = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    return (
        <div className='header-container'>
            <div className='header-content'>
                <Link className='header-logo' to='/'>
                    <GiCookingPot className='header-logo-icon' />
                    <span className='header-logo-title' >Cookbook</span>
                </Link>
                <div>
                    <span className='search'>
                        <input className='header-input search-input' style={{borderRight:'none'}} placeholder='Search meal' onKeyPress={onEnter} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                        <span className='search-icon' onClick={handleSearchInput}><IoSearchOutline /></span>
                    </span>
                    {loggedIn ? <Link className='header-links' to='/my_meals' >My meals</Link> : null}
                    <Login />
                </div>
            </div>
        </div>
    );
}

export default Header;
