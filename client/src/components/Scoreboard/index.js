import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Scoreboard from './components';
import { getScoreboardByContest } from '../../redux/actions/scoreboard.actions';

const mapStateToProps = state => ({
  scoreboard: state.scoreboard.scoreboardByContest,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getScoreboardByContest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Scoreboard));
