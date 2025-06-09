// components/TicketForm.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function TicketForm({ticket}) {
    const EDITMODE = ticket._id === "new" ? false : true;
    const router = useRouter();
    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "software issue"
    };
    if (EDITMODE) {
        startingTicketData.title=ticket.title
        startingTicketData.description=ticket.description
        startingTicketData.priority=ticket.priority
        startingTicketData.progress=ticket.progress
        startingTicketData.status=ticket.status
        startingTicketData.category=ticket.category
        
    }


    const [formData, setFormData] = useState(startingTicketData);
    const [message, setMessage] = useState(""); // State for displaying messages

    const changeHandler = (e) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "range" || name === "priority" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        console.log("Form submitted with data (frontend):", formData);

        // CleanedFormData is technically redundant for priority/progress if changeHandler works, but safe
        const cleanedFormData = {
            ...formData,
            priority: Number(formData.priority),
            progress: Number(formData.progress),
        };
        if (EDITMODE) {
            const res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData: cleanedFormData }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.error("Server error response:", data);
                setMessage(`Failed to update ticket: ${data.error || "Unknown error"}`);
                // If it's a validation error, display details
                if (data.details && Array.isArray(data.details)) {
                    data.details.forEach(detail => {
                        setMessage(prev => prev + `\n- ${detail.path}: ${detail.message}`);
                    });
                }
                return;
            }
            console.log("Ticket updated successfully");
            setMessage("Ticket updated successfully!");
            router.refresh();
            router.push("/");
            setFormData(startingTicketData);
            
        }
        else {
            try {
                const res = await fetch("/api/Tickets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ formData: cleanedFormData }),
                });

                const data = await res.json();

                if (!res.ok) {
                    console.error("Server error response:", data);
                    setMessage(`Failed to create ticket: ${data.error || "Unknown error"}`);
                    // If it's a validation error, display details
                    if (data.details && Array.isArray(data.details)) {
                        data.details.forEach(detail => {
                            setMessage(prev => prev + `\n- ${detail.path}: ${detail.message}`);
                        });
                    }
                    return;
                }

                console.log("Ticket created successfully");
                setMessage("Ticket created successfully!");
               

            } catch (fetchError) {
                console.error("Fetch error:", fetchError);
                setMessage("Network error or unable to connect to server.");
            }
            router.refresh();
            router.push("/");
            setFormData(startingTicketData);
            
        }
        

    };

    return (
        <div className='flex justify-center p-4 sm:p-6 lg:p-8'> {/* Added padding for better layout */}
            <form className='flex flex-col gap-4 w-full sm:w-3/4 lg:w-1/2 p-6 bg-white shadow-lg rounded-xl' onSubmit={handleSubmit}>
                <h3 className='text-2xl font-bold mb-4 text-center text-gray-800'>{
                    EDITMODE ? "Edit Ticket" : "Create New Ticket"
                 }</h3>

                <label htmlFor='title' className='text-sm font-medium text-gray-700'>Title</label>
                <input
                    id='title'
                    name='title'
                    type='text'
                    onChange={changeHandler}
                    required={true}
                    value={formData.title}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />

                <label htmlFor='description' className='text-sm font-medium text-gray-700'>Description</label>
                <textarea
                    id='description'
                    name='description'
                    onChange={changeHandler}
                    required={true}
                    value={formData.description}
                    rows={5}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y'
                ></textarea>

                <label className='text-sm font-medium text-gray-700'>Category</label>
                <select
                    name='category'
                    value={formData.category}
                    onChange={changeHandler}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                >
                    <option value={"software issue"}>Software Issue</option>
                    <option value={"hardware issue"}>Hardware Issue</option>
                    <option value={"network issue"}>Network Issue</option>
                    <option value={"other"}>Other</option>
                </select>

                <label className='text-sm font-medium text-gray-700'>Priority</label>
                <div className='flex items-center gap-4'>
                    {[1, 2, 3, 4, 5].map((p) => (
                        <React.Fragment key={p}>
                            <input
                                id={`priority-${p}`}
                                name='priority'
                                type='radio'
                                onChange={changeHandler}
                                value={p}
                                checked={formData.priority === p}
                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300'
                            />
                            <label htmlFor={`priority-${p}`} className='ml-1 text-gray-700'>{p}</label>
                        </React.Fragment>
                    ))}
                </div>

                <label className='text-sm font-medium text-gray-700'>Progress: {formData.progress}%</label>
                <input
                    type='range'
                    name='progress'
                    min={0}
                    max={100}
                    value={formData.progress}
                    onChange={changeHandler}
                    className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg'
                />

                <label className='text-sm font-medium text-gray-700'>Status</label>
                <select
                    name='status'
                    value={formData.status}
                    onChange={changeHandler}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                >
                    <option value={"not started"}>Not Started</option>
                    <option value={"in progress"}>In Progress</option>
                    <option value={"completed"}>Completed</option>
                    <option value={"on hold"}>On Hold</option>
                </select>

                <input
                    type='submit'
                    className='mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition duration-150 ease-in-out'
                    value={EDITMODE ? "Edit Ticket" : "Create New Ticket"}
                />

                {message && (
                    <div className={`mt-4 p-3 rounded-md ${message.includes("successfully") ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <p className='whitespace-pre-wrap'>{message}</p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default TicketForm;
