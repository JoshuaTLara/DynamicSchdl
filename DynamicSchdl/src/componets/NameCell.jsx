

function NameCell({isEditing, value, onValueChange}) {
  
// parent (Row) should pass DescriptionCell 2 props: 
// isEditing, value --> we can destructure them from props like
    return isEditing ? (
        <td>
            <input id="NameCell" type="text" placeholder="Name Here" value={value} onChange={(event) => onValueChange(event.target.value)} />
        </td>
    ) : (
        <td style={{textAlign: 'center' }}>{value}</td>
  )
}

export default NameCell
