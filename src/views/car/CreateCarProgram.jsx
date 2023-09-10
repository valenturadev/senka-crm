import React, { useState } from 'react';
import BusSeat from '../bus-seat/Main';

const CreateHotelProgram = () => {

  const [seats, setSeats] = useState(Array(40).fill(false)); // 27 seats, all initially unreserved

  const handleSeatClick = (seatNumber) => {
    // Toggle the reservation status of the clicked seat
    const newSeats = [...seats];
    newSeats[seatNumber - 1] = !newSeats[seatNumber - 1];
    setSeats(newSeats);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Bus Seat Reservation</h1>
      <div className="grid grid-cols-12 ">
        {seats.map((isReserved, index) => (
          <BusSeat
            key={index}
            seatNumber={index + 1}
            isReserved={isReserved}
            onClick={handleSeatClick}
          />
        ))}
      </div>
    </div>
  );
};


export default CreateHotelProgram;