import React from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'

function TicketCard() {
  return (
    <div>
        <DeleteBlock></DeleteBlock>
        <PriorityDisplay></PriorityDisplay>
        <ProgressDisplay></ProgressDisplay>
        <StatusDisplay></StatusDisplay>
    </div>
  )
}

export default TicketCard