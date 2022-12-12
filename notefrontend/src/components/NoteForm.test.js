import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = jest.fn()
  const user = userEvent.setup()

  // The most flexible way of finding elements in tests is the method querySelector 
  // of the container object, that is returned by render
  const { container } = render(<NoteForm createNote={createNote} />)

  // const input = screen.getByPlaceholderText('write note content here')
  const input = container.querySelector('#note-input')
  const sendButton = screen.getByText('save')

  // write text to the input field
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})