

function NameCell({value, onValueChange}) {
  
// parent (Row) should pass DescriptionCell 2 props: 
// isEditing, value --> we can destructure them from props like
    return (
        <td>
            <input type="text" placeholder="Name Here" value={value} onChange={(event) => onValueChange(event.target.value)} />
        </td>
      
        
  )
}

export default NameCell
