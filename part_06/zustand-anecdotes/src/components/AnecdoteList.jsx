import { beforeEach, expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnecdoteList from './AnecdoteList'
import useAnecdoteStore from '../store'
import * as anecdoteService from '../services/anecdotes'

vi.mock('../services/anecdotes', () => ({
  getAll: vi.fn(),
  createNew: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}))

const anecdotes = [
  { content: 'least popular', id: '1', votes: 1 },
  { content: 'most popular', id: '2', votes: 10 },
  { content: 'middle one', id: '3', votes: 5 },
]

beforeEach(() => {
  vi.clearAllMocks()
  useAnecdoteStore.setState({ anecdotes, filter: '' })
})

test('anekdoty sa zobrazia zoradené podľa hlasov klesajúco', () => {
  const { container } = render(<AnecdoteList />)
  const text = container.textContent

  expect(text.indexOf('most popular')).toBeLessThan(text.indexOf('middle one'))
  expect(text.indexOf('middle one')).toBeLessThan(text.indexOf('least popular'))
})

test('zobrazia sa len anekdoty vyhovujúce filtru', () => {
  useAnecdoteStore.setState({ filter: 'popular' })

  render(<AnecdoteList />)

  expect(screen.getByText('most popular')).toBeInTheDocument()
  expect(screen.getByText('least popular')).toBeInTheDocument()
  expect(screen.queryByText('middle one')).toBeNull()
})

test('hlasovanie zvýši počet hlasov anekdoty', async () => {
  anecdoteService.update.mockImplementation(async (id, changed) => changed)

  const user = userEvent.setup()
  render(<AnecdoteList />)

  const voteButtons = screen.getAllByText('vote')
  await user.click(voteButtons[0])

  expect(anecdoteService.update).toHaveBeenCalledWith('2', {
    content: 'most popular',
    id: '2',
    votes: 11,
  })

  await waitFor(() => {
    const voted = useAnecdoteStore.getState().anecdotes.find((a) => a.id === '2')
    expect(voted.votes).toBe(11)
  })
})