import "../styles/auth.css";

const InputField = ({ id, name, type, value, onChange, children }) => {
  return (
    <div className={`input-field--auth ${value ? "invalid" : ""}`}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default InputField;
