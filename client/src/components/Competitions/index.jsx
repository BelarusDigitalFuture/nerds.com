import React from 'react'
import PropTypes from 'prop-types'

import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: '#',
    title: 'Городская олимпиада по физике',
    description: 'актуальна до 06.05.2021',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Competitions = props => {
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
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <>ЗАВЕРШЕНА</>,
          ]}
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
};

Competitions.propTypes = {

};

export default Competitions;
