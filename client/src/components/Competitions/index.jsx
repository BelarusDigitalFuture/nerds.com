import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { List, Space } from 'antd';
import {withRouter} from "react-router-dom";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Competitions = ({ data, history }) => {
  const onOpenContest = (contestId) => {
    history.push(`/contest/${contestId}`);
  };

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
            <>{item.status}</>,
          ]}
        >
          <List.Item.Meta
            title={<a onClick={() => onOpenContest(item._id)}>{item.description}</a>}
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

export default withRouter(Competitions);
