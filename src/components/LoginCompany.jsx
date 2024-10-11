import React from 'react';
import BasicHeader from './BasicHeader';
import Input from './core/Input';
import { useState } from 'react';
import "../css/Common.css";
import "../css/Login.css"
import { useMutation, gql } from '@apollo/client';

const LOGIN_COMPANY = gql`
  mutation loginCompany($companyId: String!, $password: String!) {
    loginCompany(companyId: $companyId, password: $password) {
      token
      kind
    }
  }
`;

const LoginCompany = () => {
    const [companyId, setCompanyId] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [loginMutation] = useMutation(LOGIN_COMPANY);

    const handleSubmit = async () => {
        if (!(companyId && password)) {
            setError("You must enter both company ID and password!");
        } else {
            try {
                const { data } = await loginMutation({
                  variables: {
                    companyId,
                    password
                  },
                });
          
                console.log(data);
                setError(null);
                localStorage.setItem("token", data.loginCompany.token);
                localStorage.setItem("userKind", data.loginCompany.kind);
                localStorage.setItem("company", true);
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
          <Input value={companyId} setFieldValue={setCompanyId} label="Company ID" type="text" icon="id" />
          <Input value={password} setFieldValue={setPassword} label="Password" type="password" icon="password" />
          <div className="login-actions">
          <button type="submit" onClick={handleSubmit} className="yellow-button">Login</button>
          <a href="/register/company" className="register-link">Register</a>
      </div>
      <div className="register-text">
          <a href="/login/individual">Want to login as an individual?</a>
      </div>
      <div className="register-text">
      <span className="error-span">{error}</span>
      </div>
        </div>
        </>
    )
}

export default LoginCompany;