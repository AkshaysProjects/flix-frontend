const InputField = ({ id, type, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full bg-box-bg text-body-m border-b-light-blue border-b-2 p-4 text-white outline-none focus:border-b-white transition duration-300 caret-red-500"
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default InputField;
