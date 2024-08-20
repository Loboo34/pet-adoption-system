import React from 'react'

const Nav = () => {
  return (
    <div className="">
      <nav
        className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm shadow-blue-700 font-mono"
        role="navigation"
      >
        <div className="pl-8">Pet Adoption</div>
        <div className="pr-8">
          <a
            href="/users?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
            className="p-4"
          >
            Home
          </a>
          <a
            href="/records?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
            className="p-4"
          >
            Records
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Nav