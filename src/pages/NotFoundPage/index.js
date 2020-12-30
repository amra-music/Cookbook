import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PageNotFound = () => {

    const history = useHistory();

    return (
        <div className='content-wrap' style={{ textAlign: 'center', position: 'relative' }}>
            <h1 className='pageNotFound-title'>
                Page not found
                <FaArrowLeft className='icon-btn arrow-icon' onClick={() => history.goBack()} />
            </h1>
            <div className='pageNotFoundImageWrap'>
                <img alt='pageNotFoundImage' src='https://i.imgur.com/Aoxj1ve.png' style={{ width: 500, height: 500 }} />
            </div>
        </div>
    );
}

export default PageNotFound;
