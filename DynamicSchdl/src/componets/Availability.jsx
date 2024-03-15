

const getDayName = (day) => {
    const daysOfWeekNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    return daysOfWeekNames[day - 1]; // Adjust the index since daysOfWeek starts from 1
  };
  
  // Your Avaliblility component
  function Availability({ isEditing, availability, onAvailabilityChange }) {
    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7]; // 1 for Sunday, 2 for Monday, and so on
  
    const handleCheckboxChange = (day) => {
      // Update the availability state for the specific day
      onAvailabilityChange((prevAvailability) => ({
        ...prevAvailability,
        [day]: !prevAvailability[day],
      }));
    };
  
    return (
      <>
      <td className="CellAvailability">Availability:</td>
      <td colSpan={2}>
        {isEditing ? (
          <div style={{ display: 'flex', margin: '10px', gap:'10px' }}>
            {daysOfWeek.map((day) => (
              <div key={day}>
                <input
                  type="checkbox"
                  checked={availability[day]}
                  onChange={() => handleCheckboxChange(day)}
                  />
                <label htmlFor={day}>{getDayName(day)}</label>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', margin: '10px', gap:'10px' }}>
            {daysOfWeek.map((day) => (
              <div key={day}>{getDayName(day)}</div>
              ))}
          </div>
        )}
      </td>
        </>
    );
  }
  
  export default Availability; // Export your component