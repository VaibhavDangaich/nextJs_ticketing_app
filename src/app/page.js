import TicketCard from "./(components)/TicketCard"

function Dashboard() {
  return (
    <div className="p-3 lg:grid grid-cols-2 xl:grid-cols-4">
    <TicketCard></TicketCard>
    <TicketCard></TicketCard>
    <TicketCard></TicketCard>
    <TicketCard></TicketCard>
    </div>
  )
}

export default Dashboard