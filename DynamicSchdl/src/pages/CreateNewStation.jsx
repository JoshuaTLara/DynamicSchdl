import AddButton from "../componets/AddButton"
import StationRow from "../componets/StationRow"
import { useEffect, useState } from "react"
import axios from "axios"

export default function CreateNewStation() {


   const [currentData, setCurrentData] = useState([])

   useEffect(() => {
    axios.get("/api/stations")
    .then((res) => {setCurrentData(res.data.stations)})
}, [])

const rows = currentData.map((stationData) => {
    const {stationId, stationName} = stationData;

    return (
        <StationRow
        key={stationId}
        initialIsEditing={false}
        initialData={{ stationId, stationName }}
        deleteFunc={() => deleteRow(stationId)}
        />
    )
})


const addRow = async () => {
    const response = await axios.post('/api/addStation', {
        stationName: "Station Name Here"
    })

    
    setCurrentData([...currentData, response.data.station])
}
  //delet function needs to get the rows id and then find the entry in current data and remove it( and use the setCurrent Data)
  const deleteRow = (stationId) => {
    
    //send a DELETE request to our server 
axios.delete(`/api/station/delete/${stationId}`)
        .then((res) => {
                
            if (res.data.success) {
                const filteredList = currentData.filter((currentData) => {
                    return currentData.stationId !== stationId

                })
                setCurrentData(filteredList)
            } else {
                console.log("Error from server:", res.data.error || res.data.message || res.data);
            }

        })
}
     
    return (
    <>
    <div>
        <table>
            <thead>
                <th></th>
                <th style={{textAlign: 'center' }}>
                Station Name
                </th>
                    
            </thead>
            <tbody>
                 {rows}
            </tbody>
            <tfoot>
                <AddButton addRow={addRow} />
            </tfoot>
        </table>
    </div>
    </>
    )
}