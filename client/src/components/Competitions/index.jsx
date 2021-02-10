import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {List, notification, Space} from 'antd';
import {withRouter} from "react-router-dom";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Competitions = ({ data, history }) => {
  const onOpenContest = (contest) => {
    const curDate = moment();
    if (curDate.isBetween(moment(contest.startDate), moment(contest.endDate))) {
      history.push(`/contest/${contest._id}`);
    } else {
      notification.info({
        message: curDate.isAfter(moment(contest.endDate)) ? 'Соревнование окончено' : 'Соревнование ещё не началось',
        placement: 'topRight',
      });
    }
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
            title={<a onClick={() => onOpenContest(item)}>{item.description}</a>}
            description={
              `Дата старта: ${moment(item.startDate).format('YYYY-MM-DD hh:mm:ss')}\n
              Дата окончания: ${moment(item.endDate).format('YYYY-MM-DD hh:mm:ss')}`
            }
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
