import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='border-b'>
    <div className='flex justify-between items-center text-lg p-4 max-w-[1200px] mx-auto'>
      <Link to={'/'}>
      <img src="./../assets/crest.png" className='w-20 h-14' alt="Logo" />
      </Link>
      <div className='flex space-x-3 w-[50%] items-right'>
        <input type="text" className='border rounded p-2 w-full outline-none' placeholder='Search for courses...' name="" id="" />
        <ul className='flex items-center space-x-4'>
          <li>Contact</li>
          <li>About</li>
        </ul>
        <div className='flex items-center ml-4'>
          <h1 className='p-2 bg-blue-700 text-white px-4 rounded-full'>D</h1>
          <IoMdArrowDropdown />
        </div>
    </div>
      </div>
    </div>
  )
}
