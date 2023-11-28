import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, FormControl, Row, Col } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi'; // Import biểu tượng search từ React Bootstrap
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
    };
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }

  render() {
    const navbarStyle = {
      backgroundColor: 'rgb(130, 200, 232)',
      borderRadius: '10px',
    };

    const cates = this.state.categories.map((item) => (
      <Nav.Item key={item._id}>
        <Nav.Link as={Link} to={'/product/category/' + item._id}>
          {item.name}
        </Nav.Link>
      </Nav.Item>
    ));

    return (
      <Navbar expand="lg" variant="light" className="border-bottom" style={navbarStyle}>
        <div className="container">
          <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">{cates}</Nav>
            <div className="float-right">
              <Row className="align-items-center">
                <Col>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="keyword"
                    value={this.state.txtKeyword}
                    onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}
                  />
                </Col>
                <Col>
                  <Button variant="primary" onClick={(e) => this.btnSearchClick(e)}>
                    <BiSearch /> {/* Sử dụng biểu tượng search từ React Bootstrap */}
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="float-clear" />
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
}

export default withRouter(Menu);
