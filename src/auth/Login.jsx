import React, {useState} from 'react'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import './Login.css'

function Login () {
    const [loginError, setLoginError] = useState(false);

    const [userInput, setUserInput] = useState({
        userName:'',
        userPassword:''
    });
    
    function handleChange(event) {
        const {name, value} = event.target;
        setUserInput(prevUserInput => ({
            ...prevUserInput,
            [name]: value
        }))
    }
    
    async function handleSubmit(event) {
        console.log('Form submitted!');
        event.preventDefault();
        if (!userInput.userName || !userInput.userPassword) {
            setLoginError(true);
            return;
        }

        setLoginError(false);
        
        console.log({ userInput })
    }

    return (
        <div className='container'>
            <div className='loginWindow'>
                <h1>Login</h1>
                {loginError && (<div className="errorMessage">Please enter an email and password</div>)}
                <form className='loginForm' onSubmit={handleSubmit}>
                    <label>
                        User Email:
                        <input 
                            type='email'
                            name='userName'
                            value={userInput.userName}
                            onChange={handleChange}
                            />
                    </label>
                    <label>
                        Password:
                        <input 
                            type='password'
                            name='userPassword'
                            value={userInput.userPassword}
                            onChange={handleChange}
                            />
                    </label>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;