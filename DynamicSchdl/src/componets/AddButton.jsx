

function AddButton({addRow}) {
  return (
    <tr>
    <td></td>
    <td colSpan={4}>
        <button onClick={addRow} >Add Another</button>
    </td>
</tr>
  )
}

export default AddButton
