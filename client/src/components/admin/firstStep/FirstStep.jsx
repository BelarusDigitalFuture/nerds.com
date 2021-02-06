import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, FormControl, Row, Col, Breadcrumb, ListGroup, ListGroupItem } from 'react-bootstrap';

import Loader from '../../common/Loader/Loader';
import * as fromAdmin from '../../../resources/admin/admin.selectors';
import {fetchRandomCustomers} from '../../../resources/admin/admin.actions';

class FirstStep extends React.Component {
  static propTypes = {
    fetchRandomCustomers: PropTypes.func.isRequired,
    customersIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchCustomerId: '',
      isLoading: true,
      error: '',
    }
  }

  componentWillMount = async () => {
    await this.props.fetchRandomCustomers();
    this.setState({ isLoading: false });
  };

  onSearchFilterChange = field => (event) => {
    const value = _.get(event, 'target.value') || _.get(event, 'value') || '';
    this.setState({ [field]: value, error: '' });
  };

  onSearchClick = () => {
    if (this.state.searchCustomerId) {
      this.props.history.push(`/recommendation/${this.state.searchCustomerId}`)
    } else {
      this.setState({
        error: 'Please, enter customer id',
      })
    }
  };

  onIdClick = (id) => {
    this.setState({ searchCustomerId: id }, this.onSearchClick);
  };

  render() {
    if (this.state.isLoading) {
      return (<Loader />);
    }

    return (
      <div style={{ padding: '0 1rem' }}>
        <div className="card">
          <Row>
            <Col md={4} mdOffset={3}>
              <FormControl
                value={this.state.searchCustomerId}
                onChange={this.onSearchFilterChange('searchCustomerId')}
                type="number"
                placeholder="Customer ID"
              />
              <p className="orders-list__count" style={{ color: 'red' }}>{this.state.error}</p>
            </Col>
            <Col md={2}>
              <Button
                type="submit"
                className="btn btn-primary"
                onClick={this.onSearchClick}
              >
                Get Recommendations
              </Button>
            </Col>
          </Row>
        </div>

        <Row>
          <Col md={8} mdOffset={3}>
            <p className="orders-list__count">Or try these random client ids from the validation set:</p>
            {this.props.customersIds.map(id => {
              return (
                <a
                  href=''
                  className="breadcrumb-item"
                  onClick={(e) => {e.preventDefault(); this.onIdClick(id)}}
                  key={id}
                >
                  {id}
                </a>
              )
            })}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => ({
  customersIds: fromAdmin.getCustomersIds(state),
}), {
  fetchRandomCustomers,
})(FirstStep);
