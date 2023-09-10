import React, { useState } from 'react';

const BusSeat = ({ seatNumber, isReserved, onClick }) => {
    const seatClass = isReserved ? 'bg-red-500' : 'bg-green-500';
    const seatType = seatNumber % 3 === 0 ? 'single' : 'double';

    return (
        <div
            className={`w-16 h-16 m-1 rounded-lg cursor-pointer ${seatClass}`}
            onClick={() => onClick(seatNumber)}
        >
            {seatNumber} ({seatType})
        </div>
    );
};

export default BusSeat;