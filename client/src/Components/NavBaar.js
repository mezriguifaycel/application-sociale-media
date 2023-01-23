import React, { useState } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#">My Site</a>
      </div>
      <div className={`navbar-menu ${isOpen ? "show" : ""}`}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">AllUser</a>
      </div>
      <div className="navbar-toggler" onClick={toggleNav}>
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  );
}

export default Navbar;
