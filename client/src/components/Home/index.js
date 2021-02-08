import _get from 'lodash/get'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import Home from './components';
import { getSubjects } from '../../redux/actions/subject.actions';

const mapStateToProps = state => ({
  subjects: _get(state, 'subject.subjects', []),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSubjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
