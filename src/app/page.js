import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    const data = await response.json();
    console.log("Fetched tickets:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    alert("An error occurred while fetching tickets. Please try again later.");
    return [];
  }
};

const Dashboard = async () => {
  const tickets = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-3">
      <div>
        {tickets && uniqueCategories
          ? uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <div className="mb-4" key={categoryIndex}>
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;