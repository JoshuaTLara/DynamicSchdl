import { useState } from "react"
import ModeButtons from "./ModeButtons"
import EmployeeNameCell from "./EmployeeNameCell"
import axios from "axios"
import Availability from "./Availability"

function EmployeeRow({initialData, deleteFunc, initialIsEditing,}) {
  
  
  const [editMode, setEditMode] = useState(initialIsEditing)
  const [fname, setFname] = useState(initialData.fname)
  const [lname, setLname] = useState(initialData.lname)
  const [availability, setAvailability] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const makeEditMode = () => setEditMode(true)
  const makeNormalMode = () => {
    const bodyObj = {
      fname: fname,
      lname: lname,
      availability: availability,
    }
    
    
    axios.put(`/api/employee/update/${initialData.employeeId}`, bodyObj)
    .then((res) => {
        setEditMode(false);
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
        
      });
  }

  
  return (
  <tr>
    <ModeButtons
    isEditing={editMode} 
    saveClick={makeNormalMode}
    editClick={makeEditMode}
    deleteFunc={deleteFunc}
    />
    <EmployeeNameCell 
    isEditing={editMode} 
    value={fname} 
    onValueChange={setFname}
    />
    <EmployeeNameCell 
    isEditing={editMode} 
    value={lname} 
    onValueChange={setLname}
    />
     <Availability
     isEditing={editMode} 
     availability={availability} 
     onAvailabilityChange={setAvailability} />

  </tr>
  )
}

export default EmployeeRow
