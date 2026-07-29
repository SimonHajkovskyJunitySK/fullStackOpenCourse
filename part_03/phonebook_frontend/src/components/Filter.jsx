import SimpleInput from './SimpleInput'

const Filter = ({value, onChange}) => (
    <SimpleInput
        title='filter shown with'
        value={value}
        onChange={onChange}
    />
)

export default Filter