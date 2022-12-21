import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isError, isSuccess, error }] =
    useRefreshMutation();
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verify refresh token");
        try {
          // const response =
          await refresh();
          // const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    // persist but no token
    console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    // persist yes but no token
    console.log("error");
    content = (
      <p>
        {error?.data?.message} <Link to="/login">Please login again.</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // persist and has token
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist with token
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
