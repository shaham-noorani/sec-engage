export const getRandomTicketNumber = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticketNumber = "";

  for (let i = 0; i < 3; i++) {
    ticketNumber += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return ticketNumber;
};
