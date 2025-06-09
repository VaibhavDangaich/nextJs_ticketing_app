import TicketForm from '@/app/(components)/TicketForm';
import React from 'react'

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    })
    if(!res.ok) {
      const errorData = await res.json();
      console.error("Error fetching ticket:", errorData);
     
      return null;
    }
    return await res.json();
  }
  catch (error) {
    console.error("Error fetching ticket by ID:", error);
   
    return null;
  }
}

const TicketPage =async ({ params }) => {
  const EDITMODE =params.id === "new" ? false : true;
  let updateTix = {
    
  }
  if (EDITMODE) {
    updateTix = await getTicketById(params.id);
    updateTix = updateTix.foundTicket;
    
  }
  else {
    updateTix = {
      _id:"new"
    }
  }
  return (

   
    <div><TicketForm ticket={updateTix}></TicketForm></div>
  )
}

export default TicketPage;