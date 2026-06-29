const SimpleInput = ({title, value, onChange}) => (
    <div>{title}
        <input
            value={value}
            onChange={onChange}
        />
    </div>
)

export default SimpleInput