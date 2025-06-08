import Link from 'next/link'
import { FaHome } from "react-icons/fa";
import React from 'react'
import { IoTicket } from "react-icons/io5";

function Nav() {
  return (
    <nav className='flex justify-between bg-[#18222f] p-4'>
        <div className='flex items-center space-x-4'>
        <Link href="/">
        <FaHome />
        </Link>
        <Link href="/TicketPage/new">
        <IoTicket></IoTicket>


        </Link>

        </div>
        <div>
            <p className='text-[#f1f3f5]'>Vaibhavdangaich@gmail.com</p>
        </div>
    </nav>
  )
}

export default Nav