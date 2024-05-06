import React from 'react'
import CourseCard from '../components/CourseCard'

export default function Home() {
    const coursesData = [
        { name: "Frontend Development", type: "frontend", description: "Complete Frontend Development Course" },
        { name: "Backend Development", type: "backend", description: "Complete Backend Development Course" },
        { name: "FullStack Development", type: "full-stack", description: "Complete FullStack Development Course" }
    ]
    return (
        <div className="max-w-[1200px] mx-auto">
            <div className='mt-12'>
                <h1 className='text-2xl font-bold'>My Learning</h1>
                <div className='flex space-x-5 mt-3'>
                    <button className='text-md bg-blue-500 rounded-full px-4 py-2'>In Progress</button>
                    <button className='text-md bg-gray-500 rounded-full px-4 py-2'>Completed</button>
                </div>
                <div className='mt-4'>
                    {
                        coursesData.map((course, index) => {
                            return (
                                <CourseCard course={course} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
