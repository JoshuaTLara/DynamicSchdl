import AddButton from "../componets/AddButton"
import EmployeeRow from "../componets/EmployeeRow"
import { useEffect, useState } from "react"
import axios from "axios"



function CreateNewEmployee() {

    const [currentData, setCurrentData] = useState([])

    useEffect(() => {
        axios.get("/api/employees")
        .then((res) => {setCurrentData(res.data.employees)})
    }, [])
    
    const rows = currentData.map((EmployeeData) => {
        const {employeeId, fname, lname} = EmployeeData;
    
        return (
            <EmployeeRow
            key={employeeId}
            initialIsEditing={true}
            initialData={{ employeeId, fname, lname }}
            deleteFunc={() => deleteRow(employeeId)}
            />
        )
    })

    const addRow = async () => {
        const response = await axios.post('/api/addEmployee', {
            fname: "First Name",
            lname: "Last Name"
        })
    
        
        setCurrentData([...currentData, response.data.employee])
    }
    const deleteRow = (employeeId) => {
    
        //send a DELETE request to our server 
    axios.delete(`/api/employee/delete/${employeeId}`)
            .then((res) => {
                    
                if (res.data.success) {
                    const filteredList = currentData.filter((currentData) => {
                        return currentData.employeeId !== employeeId
    
                    })
                    setCurrentData(filteredList)
                } else {
                    console.log("Error from server:", res.data.error || res.data.message || res.data);
                }
    
            })
    }

  return (
    <> <div className="EmployeePage">
    <table>
        <thead>
            <th></th>
            <th colSpan={2} style={{textAlign: 'center'}}>Employee Name</th>
            
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

export default CreateNewEmployee
