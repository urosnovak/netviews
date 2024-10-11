import React from 'react';
import BasicHeader from './BasicHeader';
import Input from './core/Input';
import { useState } from 'react';
import "../css/Common.css";
import "../css/Login.css"
import { useMutation, gql } from '@apollo/client';

const LOGIN_INDIVIDUAL = gql`
  mutation loginIndividual($username: String!, $password: String!) {
    loginIndividual(username: $username, password: $password) {
      token
      kind
    }
  }
`;

const LoginCompany = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [loginMutation] = useMutation(LOGIN_INDIVIDUAL);

    const handleSubmit = async () => {
        if (!(username && password)) {
            setError("You must enter both username and password!");
        } else {
            try {
                const { data } = await loginMutation({
                  variables: {
                    username,
                    password
                  },
                });
          
                console.log(data);
                setError(null);
                localStorage.setItem("token", data.loginCompany.token);
                localStorage.setItem("userKind", data.loginCompany.kind);
                localStorage.setItem("company", false);
                window.location.href = "/success";
          
              } catch (e) {
                setError("Entered credentials are not valid!")
              }
        }
    }

    return (
        <>
        <BasicHeader text="Login" />
        <div className="login-wrapper">
          <Input value={username} setFieldValue={setUsername} label="Username" type="text" icon="id" />
          <Input value={password} setFieldValue={setPassword} label="Password" type="password" icon="password" />
          <div className="login-actions">
          <button type="submit" onClick={handleSubmit} className="yellow-button">Login</button>
          <a href="/register/individual" className="register-link">Register</a>
      </div>
      <div className="register-text">
          <a href="/login/company">Want to login as a company?</a>
      </div>
      <div className="register-text">
      <span className="error-span">{error}</span>
      </div>
        </div>
        </>
    )
}

export default LoginCompany;