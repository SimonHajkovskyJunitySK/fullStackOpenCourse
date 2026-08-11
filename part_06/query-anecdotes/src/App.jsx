import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes, useVoteAnecdote } from './hooks'
import { useNotify } from './NotificationContext'

const App = () => {
  const result = useAnecdotes()
  const voteAnecdote = useVoteAnecdote()
  const notify = useNotify()

  const handleVote = (anecdote) => {
    voteAnecdote.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          notify(`anecdote '${anecdote.content}' voted`)
        },
      }
    )
  }

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App