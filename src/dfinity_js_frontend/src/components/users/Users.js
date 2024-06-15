import React, { useEffect, useState, useCallback } from "react";


import User from "./User";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {  getClients as getClientList, getClient } from "../../utils/client";



const Users = () => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);



  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      setClients(await getClientList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  //get user
  const getUser = useCallback(async (id) => {
    try {
      setLoading(true);
      setClient(await getClient(id));
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });




  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Users Manager</h1>
          
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {clients.map((_client, index) => (
              <User
                key={index}
                client={{
                  ..._client,
                }}
                //update={update}
              />
            ))}
          </Row>
         
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Users;
