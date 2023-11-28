import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }

  render() {
    // Tạo danh sách các tùy chọn danh mục cho thẻ select
    const categoryOptions = this.state.categories.map((cate) => (
      <option key={cate._id} value={cate._id} selected={cate._id === this.props.item?.category._id}>
        {cate.name}
      </option>
    ));

    // Tạo kiểu CSS cho phần chi tiết sản phẩm
    const productDetailStyle = {
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    };

    // Tạo kiểu CSS cho nút
    const buttonStyle = {
      backgroundColor: 'rgb(130, 200, 232)',
      marginRight: '10px',
    };

    return (
      <div className="float-right" style={productDetailStyle}>
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <Form>
          <Container>
            {/* Phần ID và Tên */}
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formID">
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="text" value={this.state.txtID} readOnly={true} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={this.state.txtName} onChange={(e) => this.setState({ txtName: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>

            {/* Phần Giá và Ảnh */}
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" value={this.state.txtPrice} onChange={(e) => this.setState({ txtPrice: e.target.value })} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} />
                </Form.Group>
              </Col>
            </Row>

            {/* Phần Danh mục */}
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" onChange={(e) => this.setState({ cmbCategory: e.target.value })}>
                    {categoryOptions}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Phần Nút */}
            <Row>
              <Col>
                <Button variant="primary" style={buttonStyle} onClick={(e) => this.btnAddClick(e)}>
                  ADD NEW
                </Button>
                <Button variant="success" style={buttonStyle} onClick={(e) => this.btnUpdateClick(e)}>
                  UPDATE
                </Button>
                <Button variant="danger" style={buttonStyle} onClick={(e) => this.btnDeleteClick(e)}>
                  DELETE
                </Button>
              </Col>
            </Row>

            {/* Phần Hiển thị Ảnh */}
            <Row>
              <Col>
                {this.state.imgProduct && (
                <img src={this.state.imgProduct} width="175px" height="175px" alt="" />
                )}
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item?._id,
        txtName: this.props.item?.name,
        txtPrice: this.props.item?.price,
        cmbCategory: this.props.item?.category._id,
        imgProduct: `data:image/jpg;base64,${this.props.item?.image}`,
      });
    }
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

    if (id && name && price && category && image) {
      const prod = { name, price, category, image };
      this.apiPutProduct(id, prod);
    } else {
      alert('Please input id and name and price and category and image');
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

    if (name && price && category && image) {
      const prod = { name, price, category, image };
      this.apiPostProduct(prod);
    } else {
      alert('Please input name and price and category and image');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please input id');
      }
    }
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/products/${id}`, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/products?page=${this.props.curPage}`, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages, result.curPage);
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages, result.curPage);
      } else {
        const curPage = this.props.curPage - 1;
        axios.get(`/api/admin/products?page=${curPage}`, config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages, curPage);
        });
      }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete(`/api/admin/products/${id}`, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default ProductDetail;
