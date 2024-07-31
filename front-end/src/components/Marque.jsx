import React from "react";
import "../styles/landingpage.css";

function RunningText({ text }) {
  return (
    <div className="running-text">
      <marquee behavior="scroll" direction="left">
        {text}
      </marquee>
    </div>
  );
}

export default RunningText;
