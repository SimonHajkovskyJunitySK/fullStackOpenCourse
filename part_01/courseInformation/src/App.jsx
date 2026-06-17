const Header = (parts) => {
  return (<h1>{parts.c}</h1>)
}

const Part = (parts) => {
  return (<p>{parts.p} {parts.e}</p>)
}

const Content = (parts) => {
  return (
    <>
      <Part p={parts.parts[0].name} e={parts.parts[0].exercises}/>
      <Part p={parts.parts[1].name} e={parts.parts[1].exercises}/>
      <Part p={parts.parts[2].name} e={parts.parts[2].exercises}/>
    </>
  )
}

const Total = (parts) => {
  return (
    <p>Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header c={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App