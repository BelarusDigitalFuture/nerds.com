import React from 'react'
import PropTypes from 'prop-types'

import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = props => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не существует"
      extra={<Link to="/home"><Button type="primary">На главную</Button></Link>}
    />
  )
}

NotFound.propTypes = {

}

export default NotFound
