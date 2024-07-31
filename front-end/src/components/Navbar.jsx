import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
// import { ListItem } from "./ListItem.jsx";
// import feather from 'feather-icons';
export function Navbar({ toggleMenu, toggleMode, mode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Navlogo />
      <div className={`nav-list ${isOpen ? "open" : ""}`}>
        {/* <ListItem href={"#"} label={"Home"} className={"list-item"} />
        <ListItem href={"#"} label={"About"} className={"list-item"}/>
        <ListItem href={"#"} label={"Features"} className={"list-item"}/> */}
      </div>
      <button className="nav-toggle" onClick={toggleMenu}>
        <i data-feather="menu"></i>
      </button>
      <button className="mode-toggle" onClick={toggleMode}>
        {mode === "light" ? (
          <i className="toggle-kiri" data-feather="toggle-left"></i>
        ) : (
          <i className="toggle-kanan" data-feather="toggle-right"></i>
        )}
      </button>
    </nav>
  );
}

function Navlogo() {
  return (
    <div className="navbar-logo">
      <h2 className="navbar-title">Task Manager</h2>
    </div>
  );
}
