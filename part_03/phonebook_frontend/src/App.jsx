import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import personService from './services/personService'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const popMessage = (text, color) => {
    setMessageColor(color)
    setNotificationMessage(text)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        const newPerson = { ...oldPerson, number: newNumber}

        personService
          .update(oldPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== oldPerson.id ? person : returnedPerson
            ))
            popMessage(`Changed number ${newNumber}`, 'green')
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          popMessage(`Added person ${newName}`, 'green')
          setNewName('')
          setNewNumber('')
      })
    } 
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          popMessage(`Deleted person ${name}`, 'green')
        })
        .catch(error => {
          popMessage(`Information of ${name} has already been removed from server`, 'red')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage} color={messageColor}/>
        <Filter
          value={filter}
          onChange={handleFilterChange}
        />
      <h3>add a new</h3>
        <PersonForm
          onSubmit = {addPerson}
          nameValue = {newName}
          nameOnChange = {handleNameChange}
          numberValue = {newNumber}
          numberOnChange = {handleNumberChange}
        />
      <h3>Numbers</h3>
        <Persons
          personsToShow={personsToShow}
          deleteClick={deletePerson}
        />
    </div>
  )
}

export default App