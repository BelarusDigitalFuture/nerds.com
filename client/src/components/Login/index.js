import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser, loginUser } from '../../redux/actions/account.actions';
import Login from './components';

const mapDispatchToProps = dispatch => bindActionCreators({
  signUpUser,
  loginUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);
