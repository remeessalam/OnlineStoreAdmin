import "./AlertModal.css";
const AlertModal = ({ show, success, alertmsg }) => {
  return (
    <div className="alert_modal_container" style={{ zIndex: "1000" }}>
      <div className="alert_modal">
        <h1>{alertmsg}</h1>
        <div className="alert_modal_button_container">
          <button onClick={success}>ok</button>{" "}
          <button onClick={() => show((pre) => !pre)}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
