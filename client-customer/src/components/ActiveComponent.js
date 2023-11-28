import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: '',
    };
  }

  render() {
    const formStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)', // Add this line for the blurred effect
    };

    return (
      <div className="align-center">
        <h2 className="text-center">ACTIVE ACCOUNT</h2>
        <Form onSubmit={(e) => this.btnActiveClick(e)} style={formStyle}>
          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              value={this.state.txtID}
              onChange={(e) => this.setState({ txtID: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicToken">
            <Form.Label>Token</Form.Label>
            <Form.Control
              type="text"
              value={this.state.txtToken}
              onChange={(e) => this.setState({ txtToken: e.target.value })}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              ACTIVE
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const { txtID, txtToken } = this.state;
    if (txtID && txtToken) {
      this.apiActive(txtID, txtToken);
    } else {
      alert('Please input ID and Token');
    }
  }

  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Active;
