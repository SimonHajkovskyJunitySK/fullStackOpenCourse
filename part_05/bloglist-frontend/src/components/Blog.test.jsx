import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: '1',
  title: 'Testing React apps',
  author: 'Kalle Ilves',
  url: 'https://example.com/testing',
  likes: 7,
  user: {
    username: 'simon',
    name: 'Šimon Hajkovský',
    id: 'abc123'
  }
}

const creator = { username: 'simon', name: 'Šimon Hajkovský', id: 'abc123' }
const otherUser = { username: 'juraj', name: 'Juraj Novák', id: 'def456' }

describe('<Blog />', () => {

  test('shows blog info and likes to an unauthenticated user, but no buttons', () => {
    const { container } = render(
      <Blog
        blog={blog}
        user={null}
        likeBlog={() => {}}
        removeBlog={() => {}}
      />
    )

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(`likes ${blog.likes}`)
    expect(div).toHaveTextContent(blog.user.name)

    expect(screen.queryByRole('button', { name: 'like' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
  })

  test('shows only the like button to a logged in user who is not the creator', () => {
    render(
      <Blog
        blog={blog}
        user={otherUser}
        likeBlog={() => {}}
        removeBlog={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
  })

  test('shows both like and remove buttons to the creator', () => {
    render(
      <Blog
        blog={blog}
        user={creator}
        likeBlog={() => {}}
        removeBlog={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'remove' })).toBeDefined()
  })

  test('clicking the like button twice calls the handler twice', async () => {
    const mockHandler = vi.fn()
    const testUser = userEvent.setup()

    render(
      <Blog
        blog={blog}
        user={creator}
        likeBlog={mockHandler}
        removeBlog={() => {}}
      />
    )

    const likeButton = screen.getByRole('button', { name: 'like' })
    await testUser.click(likeButton)
    await testUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})