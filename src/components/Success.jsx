import React from 'react';
import BasicHeader from './BasicHeader';
import "../css/Common.css";
import "../css/Success.css";
import { AiFillCheckCircle } from 'react-icons/ai';

const Success = () => {
    const goToLogin = () => {
        window.location.href = `/login/individual`
    }
    return (
        <>
        <BasicHeader text="Success" />
        <div className="success-wrapper">
            <AiFillCheckCircle className="success-icon" />
            <div className="success-text">
            <span>You have successfully created a new account!</span>
            </div>
            <div className="success-text">
                <span>Before you can log in, you must verify your email. A verification email has been successfully sent. Please check your inbox and continue to the next step.</span>
            </div>
            <div className="success-text">
                <button type="submit" onClick={goToLogin} className="yellow-button">Login</button>
            </div>
        </div>
        </>
    )
}

export default Success;