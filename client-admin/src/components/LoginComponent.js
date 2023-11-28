import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
    };
  }

  render() {
    const backgroundImageUrl = 'https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg'; // Thay đổi đường dẫn này bằng đường dẫn của hình ảnh trên mạng
    const backgroundStyle = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const formStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Màu nền với độ trong suốt 80%
      padding: '20px',
      borderRadius: '10px', // Độ bo tròn của góc
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Khung viền mờ
    };

    const labelStyle = {
      color: 'black', // Màu chữ mặc định là đen
    };

    if (this.context.token === '') {
      return (
        <div style={backgroundStyle}>
          <h2 className="text-center text-white">ADMIN</h2>
          <Form onSubmit={(e) => this.btnLoginClick(e)} style={formStyle}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label style={labelStyle}>Username</Form.Label>
              <Form.Control
                type="text"
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={labelStyle}>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
              />
            </Form.Group>

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button variant="primary" type="submit" style={{ backgroundColor: 'hotpink', color: 'black' }}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
    return <div />;
  }

  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username, password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;
