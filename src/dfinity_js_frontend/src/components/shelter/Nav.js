import React from 'react'

const Nav = () => {
  return (
    <div>
        <nav className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm shadow-blue-700 font-mono pb-3' role='navigation'>
            <div className='pl-8'>Pet Adoption</div>
            <div className='pr-8'>
            <a href='/' className='p-4'>Home</a>
            <a href='/records' className='p-4'>Records</a>
            </div>
        </nav>
    </div>
  )
}

export default Nav