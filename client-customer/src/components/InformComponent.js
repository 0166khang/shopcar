import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import Dropdown from 'react-bootstrap/Dropdown';

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          {this.context.token === '' ? (
            <div>
              <Link to="/login">Login</Link> | 
              <Link to="/signup">Sign-up</Link> | 
              <Link to="/active">Active</Link>
            </div>
          ) : (
            <div>
              Hello <b>{this.context.customer.name}</b> | 
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  My Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/myprofile">
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/myorders">
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.lnkLogoutClick()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
        
        <div className="float-right">
          <Link to="/mycart">
            My cart
          </Link> have <b>{this.context.mycart.length}</b> items
        </div>

        <div className="float-clear" />
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;