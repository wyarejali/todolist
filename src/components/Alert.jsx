// All necessary dependences
import React, { useEffect } from "react";

// Alert
const Alert = ({ msg, type, removeAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeOut);
  });
  return (
    <div>
      <p className={`px-2 py-1 m-0 rounded alert alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
