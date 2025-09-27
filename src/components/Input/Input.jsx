import './Input.css';

export default function Input(props) {
  return (
    <>
        <label htmlFor={props.id?props.id:'search'}></label>
        <input
            className="input"
            id={props.id?props.id:'search'}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            required={props.required?props.required:false}
            step={props.step?props.step:null}
        />
    </>
  );
}