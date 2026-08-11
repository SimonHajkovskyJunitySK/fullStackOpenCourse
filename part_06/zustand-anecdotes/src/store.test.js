import { beforeEach, expect, test, vi } from 'vitest'
import useAnecdoteStore from './store'
import * as anecdoteService from './services/anecdotes'

vi.mock('./services/anecdotes', () => ({
  getAll: vi.fn(),
  createNew: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}))

const anecdotesFromBackend = [
  { content: 'If it hurts, do it more often', id: '47145', votes: 5 },
  { content: 'Premature optimization is the root of all evil.', id: '25170', votes: 3 },
]

beforeEach(() => {
  vi.clearAllMocks()
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
})

test('state sa inicializuje anekdotami z backendu', async () => {
  anecdoteService.getAll.mockResolvedValue(anecdotesFromBackend)

  await useAnecdoteStore.getState().actions.initializeAnecdotes()

  expect(anecdoteService.getAll).toHaveBeenCalledTimes(1)
  expect(useAnecdoteStore.getState().anecdotes).toEqual(anecdotesFromBackend)
})