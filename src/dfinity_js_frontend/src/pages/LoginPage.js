import React from 'react'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className=' flex justify-center items-center w-full'>
      <div >
        <h1>Login Page</h1>
        <Link
          to="/users?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
          className="justify-content-start mr-4 py-2 px-3 my-2 bg-secondary text-white rounded-pill "
        >
          client
        </Link>
        <Link
          to="/professional?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
          className="justify-content-start mr-4 py-2 px-3 my-2 bg-secondary text-white rounded-pill "
        >
          Professional
        </Link>
      </div>
    </div>
  );
}

export default LoginPage