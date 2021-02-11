import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { getContestList } from '../../../redux/actions/contest.actions'

import Subject from './components'

const mapStateToProps = state => ({
  contestList: state.contest.contestList,
  trainingList: state.contest.trainingList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getContestList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subject))
