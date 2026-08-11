import useFeedbackStore from '../store'

const Buttons = () => {
  const voteGood = useFeedbackStore((state) => state.voteGood)
  const voteNeutral = useFeedbackStore((state) => state.voteNeutral)
  const voteBad = useFeedbackStore((state) => state.voteBad)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={voteGood}>good</button>
      <button onClick={voteNeutral}>neutral</button>
      <button onClick={voteBad}>bad</button>
    </div>
  )
}

export default Buttons