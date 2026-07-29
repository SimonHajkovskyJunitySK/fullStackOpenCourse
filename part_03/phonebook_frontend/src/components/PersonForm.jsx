import SimpleInput from './SimpleInput'

const PersonForm = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => (
    <form onSubmit={onSubmit}>
        <SimpleInput
            title='name:'
            value={nameValue}
            onChange={nameOnChange}
        />
        <SimpleInput
            title='number:'
            value={numberValue}
            onChange={numberOnChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

export default PersonForm