import { gql, useMutation } from "@apollo/client";
import React, { useState } from 'react';
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import BasicHeader from "./BasicHeader";

const VERIFY_USER = gql`
  mutation verifyUser($verifyToken: String!) {
    verifyUser(verifyToken: $verifyToken) {
      id
    }
  }
`;

const Verify = (props) => {
    const [verifyUserMutation] = useMutation(VERIFY_USER);
    const { verifyToken } = props.match.params;
    const [error, setError] = useState(null);

    const verify = async () => {
        try {
            const { data } = await verifyUserMutation({
              variables: {
                verifyToken,
              },
            });
      
            console.log(data);
            window.location.href = `/login/individual`;
      
          } catch (e) {
            setError("There was an error while processing your request, please try later!")
          }
    }

    useEffect(() => {
        verify();
    }, []);

    return (
        <>
        <BasicHeader text="Verify" />
        <div>
            {error || "Verification is in progress!"}
        </div>
        </>
    )

}

export default withRouter(Verify);