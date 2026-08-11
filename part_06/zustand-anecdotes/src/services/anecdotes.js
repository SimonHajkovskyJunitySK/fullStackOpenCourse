const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('failed to fetch anecdotes')
  return response.json()
}

export const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  if (!response.ok) throw new Error('failed to create anecdote')
  return response.json()
}

export const update = async (id, changedAnecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changedAnecdote),
  })
  if (!response.ok) throw new Error('failed to update anecdote')
  return response.json()
}

export const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('failed to delete anecdote')
}