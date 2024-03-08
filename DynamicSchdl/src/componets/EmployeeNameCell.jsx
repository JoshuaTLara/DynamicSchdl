

function EmployeeNameCell({value, onValueChange}) {
  return (
    <td>
        <input type="text" placeholder="Name Here" value={value} onChange={(event) => onValueChange(event.target.value)} />
    </td>
  )
}

export default EmployeeNameCell
