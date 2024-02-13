const InputField = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  error,
  focus,
  onFocusChange,
}) => {
  // Construct the input field class string conditionally
  const inputClass = `w-full bg-box-bg text-body-m p-4 border-b-2 text-white outline-none focus:border-b-white transition duration-300 caret-red-500 ${
    error && !focus ? "border-red-500" : "border-b-light-blue"
  }`;

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClass}
        value={value}
        onChange={onChange}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
      />
      {error && !focus && (
        <div className="absolute right-0 top-0 pt-5 pr-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
