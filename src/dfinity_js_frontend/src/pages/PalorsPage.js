import React, { useCallback, useEffect, useState } from "react";

import { login, logout as destroy } from "../utils/auth";
import { Notification } from "../components/utils/Notifications";
import Cover from "../components/utils/Cover";
import coverImg from "../assets/img/sandwich.jpg";
import Loader from "../components/utils/Loader";

import Pservices from "../components/shelter/Pets";
import { getProfessionalByPrincipal } from "../utils/petAdoption";
import SinginProfessional from "../components/shelter/ShelterLogin";

const PalorsPage = () => {
  const [professional, setProfessional] = useState({});
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(false);

  const isAuthenticated = window.auth.isAuthenticated;

  const fetchProfessional = useCallback(async () => {
    try {
      setLoading(true);
      setProfessional(
        await getProfessionalByPrincipal().then(async (res) => {
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
    fetchProfessional();
  }, []);

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        !loading ? (
          professional?.name ? (
            <main>
              <Pservices service={service} />
            </main>
          ) : (
            <SinginProfessional fetchProfessional={fetchProfessional} />
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
export default PalorsPage;
