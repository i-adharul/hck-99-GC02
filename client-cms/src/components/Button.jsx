export default function Button({
  btnName,
  btnColor,
  type = "button",
  onClick,
}) {
  return (
    <>
      <button
        type={type}
        className={`btn btn-sm ${btnColor}`}
        onClick={onClick}
      >
        {btnName}
      </button>
    </>
  );
}
