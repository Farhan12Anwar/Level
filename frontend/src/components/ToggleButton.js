import React from "react";

const ToggleButton = ({ number, color, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: color,
        padding: "10px",
        margin: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => onClick(number, color)} // Handles toggle on button click
    >
      {number}
    </button>
  );
};

export default ToggleButton;
