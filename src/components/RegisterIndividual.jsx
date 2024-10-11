import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Input from "./core/Input";
import "../css/Register.css";
import "../css/Common.css";
import { useMutation, gql } from "@apollo/client";
import Select from "./core/Select";
import BasicHeader from "./BasicHeader";

const REGISTER_INDIVIDUAL = gql`
  mutation createIndividual($kind: UserKind!, $emailAddress: String!, $individual: IndividualInput!) {
    createIndividual(kind: $kind, emailAddress: $emailAddress, individual: $individual) {
      id
    }
  }
`;

const RegisterCompany = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [userKind, setUserKind] = useState("ADMIN");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);

    const [registerMutation] = useMutation(REGISTER_INDIVIDUAL);

    const handleSubmit = async () => {
        if (!(email && username && firstName && password && repeatedPassword && lastName && phoneNumber)) {
            setError("You must enter all fields!");
        } else if (password !== repeatedPassword) {
            setError("Password must be compatible with the repeated password!")
        } else {
            try {
                const { data } = await registerMutation({
                  variables: {
                    kind: userKind,
                    emailAddress: email,
                    individual: {
                        username,
                        firstName,
                        password,
                        lastName,
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
                } else if (error.hasOwnProperty("username") || errorKey === "username") {
                    setError("This username has already been taken!")
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
          <Input value={username} setFieldValue={setUsername} label="Username" type="text" icon="id" />
          <Input value={password} setFieldValue={setPassword} label="Password" type="password" icon="password" />
          <Input value={repeatedPassword} setFieldValue={setRepeatedPassword} label="Repeated password" type="password" icon="password" />
          </div>
          <div className="register-right">
            <Input value={firstName} setFieldValue={setFirstName} label="First name" type="text" icon="name" />
            <Input value={lastName} setFieldValue={setLastName} label="Last name" type="text" icon="name" />
            <Input value={phoneNumber} setFieldValue={setPhoneNumber} label="Phone number" type="text" icon="phone" />
            <Select value={userKind} setFieldValue={setUserKind} label="Select user kind:" values={["ADMIN", "USER"]} icon="userKind" />
          </div>
      </div>
      <div className="register-actions">
          <button type="submit" onClick={handleSubmit} className="yellow-button">Register</button>
          <a href="/login/individual" className="register-link">Login</a>
      </div>
      <div className="register-text">
          <a href="/register/company">Want to register as a company?</a>
      </div>
      <div className="register-text">
      <span className="error-span">{error}</span>
      </div>
      </>
    );
  };
  
  export default withRouter(RegisterCompany);