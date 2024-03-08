import axios from 'axios';
import { useEffect, useState } from 'react'


function DailyShift() {
    const [employeeAvailability, setEmployeeAvailability] = useState([]);
  
    useEffect(() => {
      axios.get("/api/employee-availability")
        .then((res) => {
          setEmployeeAvailability(res.data.employeeAvailability);
        })
        .catch((error) => {
          console.error('Error fetching employee availability:', error);
        });
    }, []);
  
    // Function to filter employees available on a specific day
    const getEmployeesAvailableOnDay = (day) => {
      return employeeAvailability.filter(employee => employee.availableDays.includes(day));
    };
  
    // Display names of employees available on day 1
    const employeesOnDay1 = getEmployeesAvailableOnDay(1);
  
    return (
      <div>
        <ul>
          {employeesOnDay1.map(employee => (
            <li key={employee.employeeId}>{employee.fname} {employee.lname}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default DailyShift;
