const Persons = ({personsToShow, deleteClick}) => (
    <div>
        {personsToShow.map(person =>
            <p key={person.id}>
                {person.name} {person.number}
                <button onClick={
                    () => deleteClick(person.id, person.name)
                }>delete</button>
            </p>
        )}
    </div>
)

export default Persons