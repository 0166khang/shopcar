import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

class Menu extends Component {
  static contextType = MyContext;

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }

  render() {
    const navbarStyle = {
      backgroundColor: 'rgb(130, 200, 232)', // Màu nền của navbar
      borderRadius: '10px', // Độ bo tròn của góc
    };

    return (
      <nav className="navbar navbar-expand-lg navbar-light border-bottom" style={navbarStyle}>
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/order">
                Order
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/customer">
                Customer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/category">
                Category
              </Link>
            </li>
          </ul>
          <div className="float-right">
            <NavDropdown title={`Hello ${this.context.username}`} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => this.lnkLogoutClick()}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
