import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Header from './components';
import { logoutUser } from '../../redux/actions/account.actions';

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(withRouter(Header));
