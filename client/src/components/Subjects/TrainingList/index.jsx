import React from 'react'
import PropTypes from 'prop-types'

import { List, Space } from 'antd';

const TrainingList = ({
  listData,
}) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={listData}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            title={<a href={item.href}>{item.name}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
}

TrainingList.defaultProps = {
  listData: [],
}

TrainingList.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.object),
}

export default TrainingList
