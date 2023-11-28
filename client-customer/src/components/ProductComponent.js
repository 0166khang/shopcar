import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Figure, Container, Row, Col } from 'react-bootstrap';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <Col key={item._id} className="mb-4">
          <Figure>
            <Link to={'/product/' + item._id}>
              <Figure.Image
                src={"data:image/jpg;base64," + item.image}
                alt={item.name}
                fluid
                rounded
              />
            </Link>
            <Figure.Caption className="text-center">
              {item.name}
              <br />
              Price: {item.price}
            </Figure.Caption>
          </Figure>
        </Col>
      );
    });

    return (
      <Container>
        <h2 className="text-center mt-4">LIST PRODUCTS</h2>
        <Row>{prods}</Row>
      </Container>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  // apis update
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);
