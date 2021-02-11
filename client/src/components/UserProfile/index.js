import _get from 'lodash/get';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserProfile from './components';
import {bindActionCreators} from "redux";
import {updateUser} from "../../redux/actions/user.actions";

const mapStateToProps = state => ({
  user: _get(state, 'user', {}),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
