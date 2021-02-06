import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import momentTz from 'moment-timezone';

import Routes from '../routes';
import Loader from '../../common/Loader/Loader';
import config from '../../../config';

class Layout extends React.Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
    ])).isRequired,
  };

  state = {
    isAllowedUser: false,
  };

  componentWillMount = async () => {
    momentTz.tz.setDefault(config.defaultTimezone);
    this.setState({
      ...this.state,
      isAllowedUser: true,
    });
  };

  render() {
    if (this.state.isAllowedUser) {
      const { location } = this.props;
      return (
        <div className="app">
          <div className="app-body">
            <main className="main">
              <Routes />
            </main>
          </div>
        </div>
      );
    }
    return (
      <Loader />
    );
  }
}

export default withRouter(connect(state => ({
}), {
})(Layout));
