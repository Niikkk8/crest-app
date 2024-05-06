import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function CourseCard({course}) {

  return (
    <>
      <Link to={`/courses/${course.type}`} className='text-lg font-semibold underline'>
        {course.name}
      </Link>
      <div className='border w-full m-2 p-3 flex'>
        <div className='w-[70%] flex'>
          <img src="./../assets/course-card-image.svg" className='w-28' alt="" />
          <Link to={`/learn/${course.type}`} className='ml-6 space-y-2 text-md mt-3'>
            <p className='text-gray-500'>Course | Google India</p>
            <h1 className='text-2xl hover:underline font-semibold'>{course.description}</h1>
          </Link>
        </div>
        <div className='border-l flex items-center justify-center w-[30%]'>
          <Link to={`/learn/${course.type}`} className='w-full flex items-center ml-20 text-lg font-semibold underline'>
            Go To Course <FaArrowRight className="ml-3" />
          </Link>
        </div>
      </div>
    </>
  )
}
