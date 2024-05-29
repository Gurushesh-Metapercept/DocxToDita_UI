import React from "react";
import logo from "../asset/MetR_Logo.svg";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.178)",
      }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="" />
          <span className="ms-3">Docx to DITA Migration</span>
        </a>
      </div>
    </nav>
  );
};

export default Header;