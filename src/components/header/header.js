import React, { Component } from "react";

import "../header/header.less";
import logo from "../../assets/images/logo.png";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-left">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="header-right"></div>
      </div>
    );
  }
}

export default Header;
