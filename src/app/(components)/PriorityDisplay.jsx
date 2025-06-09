import React from 'react'
import { FaFire } from "react-icons/fa6";

function PriorityDisplay({priority}) {
  return (
    <div className='flex align-baseline justify-start'>
      <FaFire className={`pr-1 ${priority>0 ? `text-red-500` : `text-gray-400`}`}/>
      <FaFire className={`pr-1 ${priority > 1 ? `text-red-500` : `text-gray-400`}`} />
      <FaFire className={`pr-1 ${priority > 2 ? `text-red-500` : `text-gray-400`}`} />
      <FaFire className={`pr-1 ${priority > 3 ? `text-red-500` : `text-gray-400`}`} />
      <FaFire className={`pr-1 ${priority > 4 ? `text-red-500` : `text-gray-400`}`} />
    </div>
  )
}

export default PriorityDisplay