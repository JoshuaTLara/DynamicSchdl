import { useState } from "react"
import ModeButtons from "./ModeButtons"
import NameCell from "./NameCell"
import axios from "axios"



function StationRow({initialData, deleteFunc, initialIsEditing,}) {

  const [editMode, setEditMode] = useState(initialIsEditing)

    const [stationName, setStationName] = useState(initialData.stationName)

    const makeEditMode = () => setEditMode(true)

    const makeNormalMode = () => {
      

      const bodyObj = {
        updatedStationName: stationName,
      };
     
     axios.put(`/station/update/${initialData.stationId}`, bodyObj)
  .then((res) => {
      setEditMode(false);
    })
  }
  return (
   <tr>
    <ModeButtons
    isEditing={editMode} 
    saveClick={makeNormalMode}
    editClick={makeEditMode}
    deleteFunc={deleteFunc}
    />
    <NameCell 
    isEditing={editMode}
    value={stationName} 
    onValueChange={setStationName}/>
   </tr>
  )
}

export default StationRow
