import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

  const ShowTime = () => {
    const [selected, setSelected] = useState([])
    const [available, setAvailable] = useState([])
    const [numSeats, setNumSeats] = useState(0);
    const [user, setUser] = useState('')
  
    useEffect(() => {
      getAvailableSeats();
    }, []);
  
    const getAvailableSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/available_seats/${showtimeId}`)
        setAvailable(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const getSelectedSeats = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/reserve_seats/${showtimeId}`)
        setSelected(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const handleSelection = (seat) => {
      const updatedSeats = selectedSeats.includes(seat)
        ? selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
        : [...selectedSeats, seat];
      setSelected(updatedSeats);
    };

  // https://codesandbox.io/s/movie-seat-booking-xcmdj?file=/src/App.js
  const seatLayout = () => {
    const Rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const Columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    return (
      <div className="Grid">
        {Rows.map((row, index) => (
          <div key={row} className={`row ${index >= 7 ? 'VIProw' : ''}`}>
            {Columns.map((column,colIndex) => {
              const seatNumber = `${row}${column}`;
              const isAvailable = available.includes(seatNumber);
              const isSelected = selected.includes(seatNumber);
              const seatClass = isSelected ? 'selected' : (isAvailable ? 'available' : 'unavailable');
              return (
                <button 
                  key={seatNumber}
                  className={`seat ${colIndex <4 ? 'edge-left' : ''} ${colIndex > 15 ? 'edge-right' : ''} `}
                  onClick={() => handleSeatSelection(seatNumber)}
                  disabled={!isAvailable}>{seatNumber}
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
          Name: <input type="text" id="Username" value={name} onChange={(e) => setName(e.target.value)} required />
          Number of Seats:<input type="number" id="Numseats" value={numSeats} onChange={(e) => setNumSeats(e.target.value)} required />
          <br /><br />
          {seatLayout()}
          <br />
          <button onClick={getSelectedSeats}>Reserve Seats</button>
      </div>
      <div>
        Selected Seats:
        {selected.map((seat) => (
          <span key={seat}>{seat}, </span>
        ))}
      </div>
    </div>
  );
};

export default ShowTime
