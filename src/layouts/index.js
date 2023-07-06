import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
// __apis__
import { fetchUserDetails } from "src/__apis__/accounts";
// atoms
import userAtom from "src/recoil/atoms/userAtom";
//
import DashboardLayout from "./dashboard";
import LogoOnlyLayout from "./LogoOnlyLayout";
import LoadingScreen from "src/components/LoadingScreen";

// --------------------------------------------------------------------

function LayoutGenerator(children) {
  const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");

  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    if (Boolean(accessToken)) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);

      navigate("/auth/signin");
    }
  }, [accessToken, navigate]);

  const userDetailsFetcher = useCallback(async () => {
    await fetchUserDetails()
      .then((response) => {
        console.log("hjeree", response);
        setUser(response);
      })
      .catch((error) => {
        console.log("Error fetching user details", error);
      });
  }, [setUser]);

  useEffect(() => {
    if (authenticated === true) {
      userDetailsFetcher();
    }
  }, [authenticated]);

  return (
    <>
      {authenticated ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : authenticated === null ? (
        <LoadingScreen />
      ) : (
        <LogoOnlyLayout>{children}</LogoOnlyLayout>
      )}
    </>
  );
}

export default LayoutGenerator;
