import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Scoreboard from './components';
import { getScoreboardByContest } from '../../redux/actions/scoreboard.actions';

const mapStateToProps = state => ({
  scoreboardByContest: state.scoreboard.scoreboardByContest,
  scoreboardByTraining: state.scoreboard.scoreboardByTraining,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getScoreboardByContest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Scoreboard));
