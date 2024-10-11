import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import BasicHeader from "./BasicHeader";
import Input from "./core/Input";
import "../css/Register.css";
import "../css/Common.css";
import { useMutation, gql } from "@apollo/client";
import Select from "./core/Select";

const REGISTER_COMPANY = gql`
  mutation createCompany($kind: UserKind!, $emailAddress: String!, $company: CompanyInput!) {
    createCompany(kind: $kind, emailAddress: $emailAddress, company: $company) {
      id
    }
  }
`;

const RegisterCompany = () => {
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userKind, setUserKind] = useState("ADMIN");
    const [error, setError] = useState(null);

    const [registerMutation] = useMutation(REGISTER_COMPANY);

    const handleSubmit = async () => {
        if (!(email && companyName && companyId && password && repeatedPassword && city && address && phoneNumber)) {
            setError("You must enter all fields!");
        } else if (password !== repeatedPassword) {
            setError("Password must be compatible with the repeated password!")
        } else {
            try {
                const { data } = await registerMutation({
                  variables: {
                    kind: userKind,
                    emailAddress: email,
                    company: {
                        companyName,
                        companyId,
                        password,
                        country,
                        city,
                        address,
                        phoneNumber
                    }
                  },
                });
          
                console.log(data);
                setError(null);
          
              } catch (e) {
                const error = e.graphQLErrors[0].message;
                const errorKey = e.graphQLErrors[0].key;
                if (error.hasOwnProperty("password") || errorKey === "password") {
                    setError("Entered password is not correct!");
                } else if (error.hasOwnProperty("email_address") || errorKey === "email_address") {
                    setError("This email address has already been taken!");
                } else if (error.hasOwnProperty("company_id") || errorKey === "company_id") {
                    setError("This company ID has already been taken!")
                }
                
              }
        }
    }

    return (
        <>
      <BasicHeader text="Register" />
      <div className="register-company">
          <div className="register-left">
          <Input value={email} setFieldValue={setEmail} label="Email" type="text" icon="mail" />
          <Input value={companyName} setFieldValue={setCompanyName} label="Company name" type="text" icon="house" />
          <Input value={companyId} setFieldValue={setCompanyId} label="ID number of company" type="text" icon="id" />
          <Input value={password} setFieldValue={setPassword} label="Password" type="password" icon="password" />
          <Input value={repeatedPassword} setFieldValue={setRepeatedPassword} label="Repeated password" type="password" icon="password" />
          </div>
          <div className="register-right">
            <Input value={country} setFieldValue={setCountry} label="Country" type="text" icon="country" />
            <Input value={city} setFieldValue={setCity} label="City" type="text" icon="city" />
            <Input value={address} setFieldValue={setAddress} label="Address" type="text" icon="house" />
            <Input value={phoneNumber} setFieldValue={setPhoneNumber} label="Phone number" type="text" icon="phone" />
            <Select value={userKind} setFieldValue={setUserKind} label="Select user kind:" values={["ADMIN", "USER"]} icon="userKind" />
          </div>
      </div>
      <div className="register-actions">
          <button type="submit" onClick={handleSubmit} className="yellow-button">Register</button>
          <a href="/login/company" className="register-link">Login</a>
      </div>
      <div className="register-text">
          <a href="/register/individual">Want to register as an individual?</a>
      </div>
      <div className="register-text">
      <span className="error-span">{error}</span>
      </div>
      </>
    );
  };
  
  export default withRouter(RegisterCompany);