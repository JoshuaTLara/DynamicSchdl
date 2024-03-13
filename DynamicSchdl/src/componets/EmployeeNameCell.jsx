

function EmployeeNameCell({isEditing, value, onValueChange}) {
  return isEditing ? (
    <td style={{textAlign: 'center' }} >
        <input id="EmployeeNameCell" type="text" placeholder="Name Here" value={value} onChange={(event) => onValueChange(event.target.value)} />
    </td>
     ) : (
      <td style={{textAlign: 'center' }} >{value}</td>
  )
}

export default EmployeeNameCell
