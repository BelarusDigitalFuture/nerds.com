import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: '#',
    title: 'Городская олимпиада по белорусскому языку',
    description: 'актуальна до 06.05.2021',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Competitions = ({ data }) => {
  const status = (item) => {
    if (moment().isBefore(item.endDate)) {
      return 'ПОДГОТОВКА'
    } else return 'ЗАВЕРШЕНА'
  }

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
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          actions={[
            <>{status(item)}</>,
          ]}
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.description || 'Без названия'}</a>}
            description={moment(item.endDate).format('YYYY-MM-DD')}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
};

Competitions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Competitions;
