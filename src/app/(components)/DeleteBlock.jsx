"use client";

import React from 'react'
import { LuDelete } from "react-icons/lu";

function DeleteBlock({id}) {
  const deleteTicket = async () => {
    const res=await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error deleting ticket:", errorData);
      alert("Failed to delete ticket. Please try again later.");
      return;
    }
    alert("Ticket deleted successfully.");
    // Optionally, you can refresh the page or update the UI to reflect the deletion
    window.location.reload();
  }
  return (
    <div>
    <LuDelete className='.icon' onClick={deleteTicket} />

    </div>
  )
}

export default DeleteBlock