import axios from 'axios';
import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // Sử dụng this.context để truy cập state toàn cục
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  // Xử lý hiển thị thông tin chi tiết sản phẩm
  renderProductDetails() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="align-center product-detail-container">
          <h2 className="text-center">CHI TIẾT SẢN PHẨM</h2>
          <figure className="caption-right product-detail-card">
            {/* Sử dụng Image component từ react-bootstrap để hiển thị hình ảnh */}
            <Image src={`data:image/jpg;base64,${prod.image}`} width="400px" height="400px" alt="" thumbnail />
            <figcaption>
              {/* Form hiển thị thông tin sản phẩm */}
              <form>
                <table>
                  <tbody>
                    <tr>
                      <td align="right">ID:</td>
                      <td>{prod._id}</td>
                    </tr>
                    <tr>
                      <td align="right">Tên sản phẩm:</td>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <td align="right">Giá:</td>
                      <td>{prod.price}</td>
                    </tr>
                    <tr>
                      <td align="right">Danh mục:</td>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td align="right">Số lượng:</td>
                      <td><input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                    </tr>
                    <tr>
                      <td></td>
                      {/* Thay đổi input submit thành Button từ react-bootstrap */}
                      <td>
                        <Button variant="primary" onClick={(e) => this.btnAdd2CartClick(e)}>
                          <FontAwesomeIcon icon={faShoppingCart} /> THÊM VÀO GIỎ HÀNG
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    return (<div />);
  }

  // Xử lý sự kiện khi người dùng nhấn nút "THÊM VÀO GIỎ HÀNG"
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('SẢN PHẨM ĐÃ ĐƯỢC THÊM VÀO GIỎ HÀNG!');
    } else {
      alert('Vui lòng nhập số lượng');
    }
  }

  // Gọi API để lấy thông tin sản phẩm khi component được tạo
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // Gọi API để lấy thông tin chi tiết của sản phẩm dựa trên ID
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }

  render() {
    return (
      <div>
        {this.renderProductDetails()}
      </div>
    );
  }
}

export default withRouter(ProductDetail);
