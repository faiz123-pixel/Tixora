const ROWS = "ABCDEFGHIJ".split("");

export const seatPrices = {
  silver: 150,
  gold: 220,
  recliner: 350,
};

const getSeatType = (row) => {
  if ("ABC".includes(row)) return "silver";
  if ("DEF".includes(row)) return "gold";
  return "recliner";
};

export const generateSeats = () => {
  let seats = [];

  ROWS.forEach((row) => {
    const type = getSeatType(row);
    let seatNumber =1;

    // LEFT SIDE (always)
    seats.push(
      { id: `${row}L1`,label:`${row}${seatNumber++}`, row, type, position: "left", booked: false },
      { id: `${row}L2`,label:`${row}${seatNumber++}`, row, type, position: "left", booked: Math.random() < 0.3 }
    );

    // MIDDLE 
    
      for (let i = 1; i <= 10; i++) {
        seats.push({
          id: `${row}M${i}`,
          label:`${row}${seatNumber++}`,
          row,
          type,
          position: "middle",
          booked: Math.random() < 0.25,
        });
      }

    // RIGHT SIDE (always)
    seats.push(
      { id: `${row}R1`,label:`${row}${seatNumber++}`, row, type, position: "right", booked: false },
      { id: `${row}R2`,label:`${row}${seatNumber++}`, row, type, position: "right", booked: Math.random() < 0.3 }
    );
  });

  return seats;
};
