const Header = (parts) => {
  return (<h1>{parts.c}</h1>)
}

const Part = (parts) => {
  return (<p>{parts.p} {parts.e}</p>)
}

const Content = (parts) => {
  return (
    <>
      <Part p={parts.p1} e={parts.e1}/>
      <Part p={parts.p2} e={parts.e2}/>
      <Part p={parts.p3} e={parts.e3}/>
    </>
  )
}

const Total = (parts) => {
  return (
    <p>Number of exercises {parts.e1 + parts.e2 + parts.e3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header c={course}/>
      <Content p1={part1} p2={part2} p3={part3} e1={exercises1} e2={exercises2} e3={exercises3}/>
      <Total e1={exercises1} e2={exercises2} e3={exercises3}/>
    </div>
  )
}

export default App