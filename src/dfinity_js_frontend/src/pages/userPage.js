import React, { useCallback, useEffect, useState } from "react";

import { login, logout as destroy } from "../utils/auth";
import { Notification } from "../components/utils/Notifications";
import Cover from "../components/utils/Cover";
import coverImg from "../assets/img/sandwich.jpg";
import Loader from "../components/utils/Loader";

import { getClientByPrincipal } from "../utils/client";
import Cservices from "../components/users/Services";
import SinginClient from "../components/shelter/LoginClient";

const UsersPage = () => {
  const [client, setClient] = useState({});
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(false);

  const isAuthenticated = window.auth.isAuthenticated;

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setClient(
        await getClientByPrincipal().then(async (res) => {
          console.log(res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        !loading ? (
          client?.name ? (
            <main>
              <Cservices service={service} />
            </main>
          ) : (
            <SinginClient fetchUser={fetchUser} />
          )
        ) : (
          <Loader />
        )
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};
export default UsersPage;
