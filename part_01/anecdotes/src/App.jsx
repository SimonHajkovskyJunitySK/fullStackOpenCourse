import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])

  const voteButtonclickHandler = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  const changeButtonClickHandler = () => {
    let n = Math.floor(Math.random() * 8)
    setSelected(n)
  }
  
  function getMaxVotesIndex(){
    let maxIndex = 0;
    let maxVotes = 0;
    for (let i = 0; i < anecdotes.length; i++){
      if (votes[i] > maxVotes) {
        maxIndex = i
        maxVotes = votes[i]
      }
    }
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteButtonclickHandler}>vote</button>
      <button onClick={changeButtonClickHandler}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getMaxVotesIndex()]}</p>
      <p>has {votes[getMaxVotesIndex()]} votes</p>
    </div>
  )
}

export default App