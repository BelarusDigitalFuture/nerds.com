import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Button, Table, FormControl, Row, Col, Breadcrumb, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

import Loader from '../../common/Loader/Loader';
import * as fromAdmin from '../../../resources/admin/admin.selectors';
import {fetchOrders, fetchRecommendation,} from '../../../resources/admin/admin.actions';

class Recommendation extends React.Component {
  static propTypes = {
    recommendation: PropTypes.shape({}).isRequired,
    orders: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchRecommendation: PropTypes.func.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        userId: PropTypes.node,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isLoading: true,
      searchCustomerId: props.match.params.userId,
      error: '',
    }
  }

  componentWillMount = async () => {
    console.log('load');
    this.loadFunc();
  };

  loadFunc = async () => {
    this.setState({ isLoading: true });
    await Promise.all([
      this.loadRecommendations(),
      this.loadOrders(1),
    ]);
    this.setState({ isLoading: false });
  };

  loadRecommendations = async () => {
    await this.props.fetchRecommendation({
      ...this.state,
    });
  };

  loadOrders = async (page) => {
    await this.props.fetchOrders({
      ...this.state,
      page: page || this.state.currentPage || 1,
    });
  };

  onBackClick = () => {
    this.props.history.push('/recommendation');
  };

  handlePage = ({ selected: page }) => {
    this.setState({ currentPage: page + 1 }, this.loadOrders);
  };

  render() {
    if (this.state.isLoading) {
      return (<Loader />);
    }

    const orders = this.props.orders || [];

    const ordersList = orders.map((order, index) => {
      return (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td>{moment(order.transactionDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
          <td>{_.get(order, 'orderItems', []).join(', ')}</td>
        </tr>
      );
    });

    const ordersTable = (
      <Table className="table" responsive striped bordered>
        <thead>
        <tr>
          <th><p>Order Id</p></th>
          <th><p>Order transaction date</p></th>
          <th><p>Order Items</p></th>
        </tr>
        </thead>
        <tbody>
        {ordersList}
        </tbody>
      </Table>
    );

    return (
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item className="breadcrumb-item" onClick={this.onBackClick}>
            Back
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row style={{ padding: '0 1rem' }}>
          <Col md={6}>
            <p className="orders-list__count">Previous Orders:</p>
            {ordersTable}
            <ReactPaginate
              containerClassName="pagination"
              pageClassName="page-item"
              activeClassName="active"
              pageLinkClassName="page-link"
              initialPage={0}
              onPageChange={this.handlePage}
              pageCount={this.props.numberOfPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              disableInitialCallback
            />
          </Col>
          <Col md={6}>
            <p className="orders-list__count">Recommendations</p>
            <ListGroup>
              {this.props.recommendation.menuDescriptions.map((d, index) => {
                const successItem = _.get(this.props, 'recommendation.trueItems', []).find(i => i === d._id);
                return (
                  <ListGroupItem
                    className={`list-group-item-${successItem ? 'success': ''}`}
                    key={d._id}
                  >{d.description}</ListGroupItem>
                )
              })}
            </ListGroup>
            <p className="orders-list__count">* Recommendations, that led to purchases, are marked with green</p>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default connect(state => ({
  orders: fromAdmin.getOrders(state),
  recommendation: fromAdmin.getRecommendation(state),
  numberOfPages: fromAdmin.getTotalOrdersPages(state),
}), {
  fetchRecommendation,
  fetchOrders,
})(Recommendation);
