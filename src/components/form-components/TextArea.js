const TextArea = (props) => {
  return(
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <textarea
        type={props.type}
        className="form-control"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        rows={props.rows}
        placeholder={props.placeholder}/>
    </div>
  )
}

export default TextArea;
