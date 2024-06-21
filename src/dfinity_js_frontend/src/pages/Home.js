import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";


 //bacground image
const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className="w-[100%] flex flex-col relative">
      <div className=" flex relative space-x-4 ">
        <h1>Ani-pet</h1>
        <Button className="" onClick={handleShow}>
          Login
        </Button>
        <Modal show={show}>
          <p>Sign up as User</p>
          <Link
            to="/users?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
            className="justify-content-start mr-4 py-2 px-3 my-2 bg-secondary text-white rounded-pill "
          >
            User
          </Link>
          <p>Sign up For shelter</p>
          <Link
            to="/shelter?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
            className="justify-content-start mr-4 py-2 px-3 my-2 bg-secondary text-white rounded-pill "
          >
            Shelter
          </Link>
          <button onClick={handleClose}>Close</button>
        </Modal>
      </div>
      <div className="justify-center">
        <h1>Welcome to the Pet Adoption Shelter</h1>
        <p>Adopt a pet today!</p>
      </div>
      <footer>
        <p>&copy; 2021 Pet Adoption Shelter</p>
      </footer>
    </div>
  );
}

export default Home