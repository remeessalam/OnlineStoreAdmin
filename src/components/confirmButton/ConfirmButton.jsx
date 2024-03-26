import "./ConfirmButton.css";
const ConfirmButton = ({ fun, condition, text, type }) => {
  return (
    <button
      onClick={!condition && fun}
      className={
        condition
          ? "button_container_button_loading"
          : "button_container_button"
      }
    >
      {condition ? (
        <>
          <div className="dot1"></div>
          <div className="dot2"></div>
          <div className="dot3"></div>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default ConfirmButton;
