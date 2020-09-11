import React from "react";

const ButtonWithProgress = (props) => {
    const { onClick, pendingApiCall, disabled, text} = props;

  return (
    <button
      disabled={disabled}
      className="btn btn-primary"
      onClick={onClick}
    >
      {pendingApiCall && ( // sol taraf doğruysa sağ tarafı göster (Conditional Rendering)
        <span className="spinner-border spinner-border-sm"></span>
      )}{" "}
      {text}
    </button>
  );
};

export default ButtonWithProgress;
