
        
function ModeButtons({isEditing, saveClick, editClick, deleteFunc}) {
    // props is an object with k/v pairs
    /// {isEditing: false}

  return isEditing ? (
    <td>
        <button onClick={saveClick}>Save</button>
    </td>
  ) : (
    <td>
        <button onClick={deleteFunc}>Delete</button>
        <button onClick={editClick}>Edit</button>
    </td>
  )
}

export default ModeButtons