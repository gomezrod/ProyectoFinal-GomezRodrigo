import './Input.css';

export default function Input(props) {
  return (
    <>
        <label htmlFor={"search"}></label>
        <input
            className="input"
            id="search"
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </>
  );
}