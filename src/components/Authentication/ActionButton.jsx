const ActionButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full rounded-lg text-body-m bg-red-bg hover:bg-red-500 transition-duration-300 p-4 text-white"
      formNoValidate
    >
      {text}
    </button>
  );
};

export default ActionButton;
