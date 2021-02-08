import React from 'react'
import PropTypes from 'prop-types'

import { PageHeader, Button, Divider } from 'antd';

import Contests from 'components/Contests';

const Physic = props => {
  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Физика"
        subTitle="описание"
        extra={[
          <Button key="1" type="primary">
            Добавить
          </Button>,
        ]}
        style={{ padding: 0 }}
      />
      <Divider />
      <h2>Соревнования</h2>
      <Contests />
      <h2>Тренировки</h2>
    </div>
  )
};

Physic.propTypes = {

};

export default Physic;
