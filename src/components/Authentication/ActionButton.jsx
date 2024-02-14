const ActionButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full rounded-lg text-body-m bg-red-bg hover:bg-white hover:text-black transition-duration-300 p-4"
      formNoValidate
    >
      {text}
    </button>
  );
};

export default ActionButton;
