import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập trạng thái toàn cục

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  render() {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="align-center">
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <h2 className="text-center">HỒ SƠ CÁ NHÂN</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Tên người dùng</Form.Label>
              <Form.Control
                type="text"
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                value={this.state.txtName}
                onChange={(e) => this.setState({ txtName: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                value={this.state.txtPhone}
                onChange={(e) => this.setState({ txtPhone: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={this.state.txtEmail}
                onChange={(e) => this.setState({ txtEmail: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => this.btnUpdateClick(e)}>
              CẬP NHẬT
            </Button>
          </Form>
        </Card>
      </div>
    );
  }

  componentDidMount() {
    // Nếu có thông tin khách hàng, đặt trạng thái ban đầu
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }

  // Xử lý sự kiện nút cập nhật
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username, password, name, phone, email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Vui lòng nhập tên người dùng, mật khẩu, tên, số điện thoại và email');
    }
  }

  // Gọi API cập nhật thông tin khách hàng
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('CẬP NHẬT THÀNH CÔNG!');
        this.context.setCustomer(result);
      } else {
        alert('CÓ LỖI XẢY RA!');
      }
    });
  }
}

export default Myprofile;
