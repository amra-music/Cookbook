import React, { useState } from 'react';
import { loginUser } from 'api/backend';
import { removeSession, setSession } from 'utilities/localStorage';
import { useUserContext } from 'AppContext';

import 'components/Login/Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loggedIn, setLoggedIn } = useUserContext();
    const [failedLogin, setFailedLogin] = useState(false);
    const [messageError, setMessageError] = useState('');


    const login = async () => {
        const user = {
            'username': username,
            'password': password
        }
        try {
            const data = await loginUser(user);
            setFailedLogin(false);
            setSession(data.username, data.token);
            setLoggedIn(true);
            setUsername('');
            setPassword('');
        } catch (e) {
            setUsername('');
            setPassword('');
            setMessageError(e.response.data.message);
            setFailedLogin(true);
        }
    }

    const onClick = () => {
        if (loggedIn)
            logout();
        else
            login();
    }

    const logout = () => {
        setLoggedIn(false);
        removeSession();
    }

    return (
        <>
            {loggedIn ?
                <button className='header-btn btn-purple' onClick={onClick} >
                    Logout
                </button>
                :
                <>
                    <input className='header-input' style={{ width: 150 }} placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className='header-input' style={{ width: 150 }} type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='header-btn btn-purple' onClick={onClick} >Login</button>
                </>
            }
            {failedLogin ? <div className='error-msg'>{messageError}</div> : null}
        </>
    );
}

export default Login;
