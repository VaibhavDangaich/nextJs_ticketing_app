import React from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'

function TicketCard() {
  return (
    <div className='flex flex-col gap-3 bg-[#47566a] hover:bg-[#4f5e74] rounded-md shadow-lg p-3 m-2'>
    <div className='flex mb-3 justify-between'>
     <PriorityDisplay></PriorityDisplay>
        <DeleteBlock></DeleteBlock>

    </div>
    <h4>Ticket Title</h4>
    <hr className=' h-px border-0 bg-[#2b3441] mb-2'></hr>
    <p className=' whitespace-pre-wrap'>This is the ticket description</p>
    <div className='flex-grow'></div>
        
       <div className='flex mt-2'>
       <div className='flex flex-col'>
       <p className='text-xs my-1'>08.06.2025 4:25PM</p>
          <ProgressDisplay></ProgressDisplay>

       </div>
     <div className=' ml-auto flex items-end'>
      <StatusDisplay></StatusDisplay>

     </div>
       

       </div>
       
    </div>
  )
}

export default TicketCard