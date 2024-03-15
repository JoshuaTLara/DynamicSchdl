

function EmployeeNameCell({isEditing, value, onValueChange}) {
  return isEditing ? (
    <td style={{textAlign: 'center', fontWeight:'bold' }} >
        <input id="EmployeeNameCell" type="text" placeholder="Name Here" value={value} onChange={(event) => onValueChange(event.target.value)} />
    </td>
     ) : (
      <td style={{textAlign: 'center', fontWeight:'bold' }} >{value}</td>
  )
}

export default EmployeeNameCell
