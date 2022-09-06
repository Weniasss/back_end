import React from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Navigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import { useUser } from "../UserProvider";

import { useState } from "react";

const PrivateRoute = (props) => {
  const user = useUser();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  const { children} = props;

  if (user && user.jwt) {
    ajax(`/api/auth/validate?token=${user.jwt}`, "GET", user.jwt).then((isValid) => {
      setIsValid(isValid);
		setIsLoading(false);
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading. . .</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
