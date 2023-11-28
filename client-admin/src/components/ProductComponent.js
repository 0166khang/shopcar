import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
    };
  }

  updateProducts = (products, noPages, curPage) => {
    this.setState({ products, noPages, curPage });
  };

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  lnkPageClick(index) {
    this.apiGetProducts(index);
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/products?page=${page}`, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td>
            <img src={`data:image/jpg;base64,${item.image}`} width="100px" height="100px" alt="" />
          </td>
        </tr>
      );
    });

    const pagination = (
      <Pagination className="pagination">
        {Array.from({ length: this.state.noPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === this.state.curPage}
            onClick={() => this.lnkPageClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    );

    return (
      <div className="pagination-container" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="float-left">
          <h2 className="text-center">PRODUCT LIST</h2>
          <Table striped bordered hover>
            <thead>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>{prods}</tbody>
          </Table>
          <div className="pagination-container">{pagination}</div>
        </div>
        <div className="inline" />
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }
}

export default Product;
