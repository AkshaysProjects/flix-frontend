import React from "react";

const FormInput = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage,
}) => {
  return (
    <div className="mb-6 relative">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full p-4 bg-box-bg text-white border-b-2 ${
          isValid ? "border-b-light-blue" : "border-red-500"
        } outline-none focus:border-b-white transition-colors duration-300`}
        value={value}
        onChange={onChange}
        required
        aria-invalid={!isValid}
      />
      {!isValid && (
        <span className="absolute right-0 top-0 mt-5 mr-2 text-red-500 text-sm">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInput;
