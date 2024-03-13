import { useEffect, useState } from "react"
import axios from "axios"

import lodash from "lodash"


export default function GenerateSchedule() {
    const [currentData, setCurrentData] = useState([])
    const [employeeAvailability, setEmployeeAvailability] = useState([]);

    useEffect(() => {
        axios.get("/api/stations")
        .then((res) => {setCurrentData(res.data.stations)})

        axios.get("/api/employee-availability")
        .then((res) => {
          setEmployeeAvailability(res.data.employeeAvailability);
        })
        
    }, [])
   

     //filter employees available on a specific day
     const getEmployeesAvailableOnDay = (day) => {
        return employeeAvailability.filter(employee => employee.availableDays.includes(day));
      };
    
      // names of employees available on each day
    const employeesOnDay1 = lodash.shuffle(getEmployeesAvailableOnDay(1))
    const employeesOnDay2 = lodash.shuffle(getEmployeesAvailableOnDay(2))
    const employeesOnDay3 = lodash.shuffle(getEmployeesAvailableOnDay(3))
    const employeesOnDay4 = lodash.shuffle(getEmployeesAvailableOnDay(4))
    const employeesOnDay5 = lodash.shuffle(getEmployeesAvailableOnDay(5))
    const employeesOnDay6 = lodash.shuffle(getEmployeesAvailableOnDay(6))
    const employeesOnDay7 = lodash.shuffle(getEmployeesAvailableOnDay(7))

    const scheduleRows = currentData.map((station, idx) => {
        return (
          <tr key={idx}>
            <td style={{ border: '1px solid black' }} >{station.stationName}</td>
            <td style={{ border: '1px solid black' }}>{employeesOnDay1[idx] ? employeesOnDay1[idx].fname : ''}</td>
            <td style={{ border: '1px solid black' }}>{employeesOnDay2[idx] ? employeesOnDay2[idx].fname : ''}</td>
            <td style={{ border: '1px solid black' }}>{employeesOnDay3[idx] ? employeesOnDay3[idx].fname : ''}</td>
            <td style={{ border: '1px solid black' }}>{employeesOnDay4[idx] ? employeesOnDay4[idx].fname : ''}</td>
            <td style={{ border: '1px solid black' }}>{employeesOnDay5[idx] ? employeesOnDay5[idx].fname : ''}</td>
            <td style={{ border: '1px solid black' }}>{employeesOnDay6[idx] ? employeesOnDay6[idx].fname : ''}</td>
            <td style={{ border: '1px solid black' }}>{employeesOnDay7[idx] ? employeesOnDay7[idx].fname : ''}</td>
          </tr>
        );
      });


    return (
        <>
        <h1 className="ScheduleTitle">Schedule</h1>

        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black' }}>Station Names</th> 
              <th style={{ border: '1px solid black' }}>Sunday</th>
              <th style={{ border: '1px solid black' }}>Monday</th>
              <th style={{ border: '1px solid black' }}>Tuesday</th>
              <th style={{ border: '1px solid black' }}>Wednesday</th>
              <th style={{ border: '1px solid black' }}>Thursday</th>
              <th style={{ border: '1px solid black' }}>Friday</th>
              <th style={{ border: '1px solid black' }}>Saturday</th>
            </tr>
          </thead>
          <tbody>
          {scheduleRows}
          </tbody>
        </table>
        </>
    )
}

