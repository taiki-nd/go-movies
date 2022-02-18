const Select = (props) => {
  return(
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <select className="form-select" name={props.name} value={props.mpaa_rating} onChange={props.handleChange}>
        <option className="form-select">{/* Chose... */}{props.placeholder}</option>
        {props.options.map((option) => {
          return (
            <option className="form-select" key={option.id} value={option.value}>{option.value}</option>
          )
        })}
      </select>
    </div>
  )
}

export default Select;