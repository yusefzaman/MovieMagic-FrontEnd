import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ShowTime = () => {
  const { showtimeId } = useParams()
  const [selected, setSelected] = useState([])
  const [available, setAvailable] = useState(new Array(60).fill(false))
  const [numSeats, setNumSeats] = useState(0)
  const [user, setUser] = useState('')

  useEffect(() => {
    getAvailableSeats()
  }, [])

  const getAvailableSeats = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/available_seats/${showtimeId}`
      )
      setAvailable(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSeatSelection = (seatIndex) => {
    if (available[seatIndex]) return

    setSelected((prevSelected) =>
      prevSelected.includes(seatIndex)
        ? prevSelected.filter((seat) => seat !== seatIndex)
        : [...prevSelected, seatIndex]
    )
  }

  const handleReserveSeats = async () => {
    try {
      await axios.post(`http://127.0.0.1:5000/reserve_seats/${showtimeId}`, {
        seats: selected
      })
      alert('Seats reserved successfully!')
      getAvailableSeats()
      setSelected([])
    } catch (error) {
      console.error('Error reserving seats:', error)
    }
  }

  const seatLayout = () => {
    const Rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const Columns = [1, 2, 3, 4, 5, 6]

    return (
      <div className="grid">
        {Rows.map((row, rowIndex) => (
          <div key={row} className={`row ${rowIndex >= 7 ? 'VIProw' : ''}`}>
            {Columns.map((column) => {
              const seatIndex = rowIndex * Columns.length + column - 1
              const isAvailable = !available[seatIndex]
              const isSelected = selected.includes(seatIndex)
              const seatClass = isSelected
                ? 'selected'
                : isAvailable
                ? 'available'
                : 'unavailable'

              return (
                <button
                  key={seatIndex}
                  className={`seat ${seatClass}`}
                  onClick={() => handleSeatSelection(seatIndex)}
                  disabled={!isAvailable}
                >
                  {row}
                  {column}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="reserve-seats">
      <h2>Reserve Seats</h2>
      <div className="input-form">
        Name:
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        Number of Seats:
        <input
          type="number"
          value={numSeats}
          onChange={(e) => setNumSeats(e.target.value)}
          required
        />
        <br />
        <br />
        {seatLayout()}
        <br />
        <button onClick={handleReserveSeats}>Reserve Seats</button>
      </div>
      <div>
        Selected Seats:
        {selected.map((seat) => (
          <span key={seat}>{seat}, </span>
        ))}
      </div>
    </div>
  )
}

export default ShowTime
