import React from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'

function TicketCard({ ticket }) {
  const timeStamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,

    };
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, "$2/$1/$3, $4:$5");
    
  }
  return (
    <div className='flex flex-col gap-3 bg-[#47566a] hover:bg-[#4f5e74] rounded-md shadow-lg p-3 m-2'>
    <div className='flex mb-3 justify-between'>
     <PriorityDisplay priority={ticket.priority}></PriorityDisplay>
        <DeleteBlock></DeleteBlock>

    </div>
      <h4>{ticket.title}</h4>
    <hr className=' h-px border-0 bg-[#2b3441] mb-2'></hr>
      <p className=' whitespace-pre-wrap'>{ticket.description}</p>
    <div className='flex-grow'></div>
        
       <div className='flex mt-2'>
       <div className='flex flex-col'>
          <p className='text-xs my-1'>{timeStamp(ticket.createdAt)}</p>
          <ProgressDisplay progress={ticket.progress}></ProgressDisplay>

       </div>
     <div className=' ml-auto flex items-end'>
      <StatusDisplay status={ticket.status}></StatusDisplay>

     </div>
       

       </div>
       
    </div>
  )
}

export default TicketCard