"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function TicketForm() {
    const startingTicketData={
        title:"",
        description:"",
        priority:1,
        progress:0,
        status:"not started",
        category:"software issue"
    }
    const [formData,setFormData]=useState(startingTicketData);
    const changeHandler=(e)=>{
        const value=e.target.value;
        const name=e.target.name;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }));
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
    }
  return (
    <div className='flex justify-center'>
        <form className='flex flex-col gap-3 w-1/2' method='POST' onSubmit={handleSubmit}>
            <h3>Create Your Ticket</h3>
            <label htmlFor='title'>Title</label>
            <input id='title' name='title' type='text' onChange={changeHandler} required={true} value={formData.title}></input>

        </form>
    </div>
  )
}

export default TicketForm