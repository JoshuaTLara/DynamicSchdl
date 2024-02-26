

function CreateStation(isEditing, value, onValueChange) {
  return isEditing ? (
    <td>
        <input type="text" value={value} onChange={(event) => onValueChange(event.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  )
}

export default CreateStation
