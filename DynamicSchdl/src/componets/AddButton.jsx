

function AddButton({addRow}) {
  return (
    <tr>
    <td></td>
    <td style={{textAlign: 'center'}} >
        <button className="Button" onClick={addRow} >Add Another</button>
    </td>
</tr>
  )
}

export default AddButton
