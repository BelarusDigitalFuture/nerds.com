import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const ContestCounter = (props) => {
  const { endDate } = props

  const [restTime, setRestTime] = useState(0);

  const calcTime = () => {
    const restMs = moment.duration(moment(endDate).diff(moment.now())).asMilliseconds()
    const formatRestTime = moment(restMs).format('HH:mm:ss')

    setRestTime(formatRestTime)
  }

  useEffect(() => {
    calcTime()

    const intervalName = setInterval(calcTime, 1000)

    return () => clearInterval(intervalName)
  }, [])

  return (
    <span>
      До окончания {restTime}
    </span>
  )
}

ContestCounter.propTypes = {
  endDate: PropTypes.string.isRequired,
}

export default ContestCounter
