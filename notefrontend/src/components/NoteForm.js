import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)  // the field's current value
  }

  const addNote = (event) => {
    event.preventDefault()  // prevent submitting form by default
    createNote({
      content: newNote,
      important: false
      // id: notes.length + 1,  // don't make id manually here, let server generate
      // date: new Date().toISOString(),
    })
    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
          placeholder='write note content here'
          id='note-input'
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm