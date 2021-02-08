import { connect } from 'react-redux'

import { getContestList } from 'redux/actions/contest.actions'

import BelLang from './components'

const mapStateToProps = state => ({
  contestList: state.contest.list,
})

const mapDispatchToProps = dispatch => ({
  getContestList: () => dispatch(getContestList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BelLang)