import React, { useState } from 'react';

const ShowTime = () => {
    const [selected, setSelected] = useState([]);
    const [numSeats, setNumSeats] = useState(0);
    const [name, setName] = useState('');

    const Rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const Columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const handleSelection = (seat) => {
        if (selected.includes(seat)) {
            setSelected(selected.filter(selectedSeat => selectedSeat !== seat));
        } else {
            setSelected([...selected, seat]);
        }
    };

    const reserveSeats = () => {
        if (name.trim() === '') {
            alert('Please enter your name.');
            return;
        }
        if (numSeats <= 0) {
            alert('Please enter a valid number of seats.');
            return;
        }
        if (selected.length !== numSeats) {
            alert(`Please select exactly ${numSeats} seats.`);
            return;
        }
        alert(`Seats reserved successfully: ${selected.join(', ')}.`);

        setSelected([]);
        setNumSeats(0);
        setName('');
    };

    const seatLayout = () => {
        return (
            <div className="Grid">
            {Rows.map((row, rowIndex) => (
                <div key={row} className={`row ${rowIndex >= 7 ? 'VIProw' : ''}`}>
                {Columns.map((column, colIndex) => {
                            const seatNumber = `${row}${column}`;
                            const isSelected = selected.includes(seatNumber);
                            const seatClass = isSelected ? 'selected' : 'available';

                            return (
                                <button
                                    key={seatNumber}
                                    className={`seat ${colIndex < 4 ? 'edge-left' : ''} ${colIndex > 15 ? 'edge-right' : ''} ${seatClass}`}
                                    onClick={() => handleSelection(seatNumber)}
                                    disabled={isSelected}
                                >
                                    {seatNumber}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="ReserveSeats">
            <h2>Reserve Seats</h2>

            <div className="inputForm">
                <label htmlFor="Username">Name:</label>
                <input type="text" id="Username" value={name} onChange={(e) => setName(e.target.value)} required />
                <br />
                <label htmlFor="Numseats">Number of Seats:</label>
                <input type="number" id="Numseats" value={numSeats} onChange={(e) => setNumSeats(parseInt(e.target.value))} required />
                <br /><br />
                {seatLayout()}
                <br />
                <button onClick={reserveSeats} disabled={selected.length !== numSeats || numSeats === 0 || name.trim() === ''}>
                    Reserve Seats
                </button>
            </div>
            <div>
                Selected Seats:
                {selected.map(seat => (
                    <span key={seat}>{seat}, </span>
                ))}
            </div>
        </div>
    );
};

export default ShowTime;
