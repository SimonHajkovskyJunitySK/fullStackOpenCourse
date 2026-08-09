import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls the event handler with the right details', async () => {
  const createBlog = vi.fn()
  const testUser = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await testUser.type(titleInput, 'Testing React apps')
  await testUser.type(authorInput, 'Kalle Ilves')
  await testUser.type(urlInput, 'https://example.com/testing')

  await testUser.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing React apps',
    author: 'Kalle Ilves',
    url: 'https://example.com/testing'
  })
})