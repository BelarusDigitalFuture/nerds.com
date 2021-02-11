import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import { Statistic } from 'antd'

import { ClockCircleOutlined } from '@ant-design/icons'

const { Countdown } = Statistic

const ContestCounter = (props) => {
  const { endDate, handleFinish } = props

  return (
    <span>
      <Countdown
        prefix={<ClockCircleOutlined />}
        value={moment(endDate)}
        onFinish={handleFinish}
        valueStyle={{ fontSize: '20px' }}
      />
    </span>
  )
}

ContestCounter.propTypes = {
  endDate: PropTypes.string.isRequired,
  handleFinish: PropTypes.func.isRequired,
}

export default ContestCounter
