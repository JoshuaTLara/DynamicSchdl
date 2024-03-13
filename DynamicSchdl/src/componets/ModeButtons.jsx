

function ModeButtons({isEditing, saveClick, editClick, deleteFunc}) {


  
  return isEditing ? (
    <td >
        <button className="Button" onClick={saveClick}>Save</button>
    </td>
  ) : (
    <td >
        <button className="Button" onClick={deleteFunc}>Delete</button>
        <button className="Button" onClick={editClick}>Edit</button>
    </td>
  )
}

export default ModeButtons
