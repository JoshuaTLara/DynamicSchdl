

const getDayName = (day) => {
    const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeekNames[day - 1]; // Adjust the index since daysOfWeek starts from 1
  };
  
  // Your Avaliblility component
  function Availability({ availability, onAvailabilityChange }) {
    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7]; // 1 for Sunday, 2 for Monday, and so on
  
    const handleCheckboxChange = (day) => {
      // Update the availability state for the specific day
      onAvailabilityChange((prevAvailability) => ({
        ...prevAvailability,
        [day]: !prevAvailability[day],
      }));
    };
  
    return (
      <td>
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
      </td>
    );
  }
  
  export default Availability; // Export your component