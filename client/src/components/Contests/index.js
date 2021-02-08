import _get from 'lodash/get'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import Contests from './components';
import { getContestsBySubject } from '../../redux/actions/contest.actions';

const mapStateToProps = state => ({
  contests: _get(state, 'contest.contests', []),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getContestsBySubject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Contests);
