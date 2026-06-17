import { useState } from 'react'

const Title = ({text}) => (<div><h1>{text}</h1></div>)

const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)

const StatisticLine = ({text, number, unit}) => (
  <tr>
    <th>{text}</th>
    <th>{number} {unit}</th>
  </tr>
)

const Staticstic = ({good, neutral, bad}) => {
  function getAverage(){
    return (good - bad) / (good + neutral + bad)
  }

  function getPositive(){
    return 100 * (good) / (good + neutral + bad)
  }
  
  if (good + neutral + bad === 0){
    return (<p>No feedback given</p>)
  } else {
    return (
        <div>
          <table style={{textAlign: 'left'}}>
            <tbody>
              <StatisticLine text="good" number={good}/>
              <StatisticLine text="neutral" number={neutral}/>
              <StatisticLine text="bad" number={bad}/>
              <StatisticLine text="average" number={getAverage()}/>
              <StatisticLine text="positive" number={getPositive()} unit="%"/>
            </tbody>
          </table>
        </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback"/>
      <Button text="good" onClick={handleGoodClick}/>
      <Button text="neutral" onClick={handleNeutralClick}/>
      <Button text="bad" onClick={handleBadClick}/>
      <Title text="statistics"/>
      <Staticstic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App