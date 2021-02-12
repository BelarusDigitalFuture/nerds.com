import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  List, notification, Space,
  Button,
} from 'antd';
import { withRouter, Link } from "react-router-dom";
import { RightOutlined } from '@ant-design/icons';

import './styles.scss'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Competitions = ({ data, history }) => {
  const onOpenContest = (contest) => {
    const curDate = moment();
    if (curDate.isAfter(moment(contest.startDate))) {
      history.push(`/contest/${contest._id}?type=contest`);
    } else {
      notification.info({
        message: 'Соревнование ещё не началось',
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
        },
        hideOnSinglePage: true,
        pageSize: 3,
      }}
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          actions={[
             <>{item.status}</>,
          ]}
          style={{ position: 'relative' }}
        >
          <List.Item.Meta
            title={<a onClick={() => onOpenContest(item)}>{item.description}</a>}
            description={
              <div>
                <div>Дата старта: {moment(item.startDate).utcOffset('+0300').format('YYYY-MM-DD HH:mm:ss')}</div>
                <div>Дата окончания: {moment(item.endDate).utcOffset('+0300').format('YYYY-MM-DD HH:mm:ss')}</div>
              </div>
            }
          />
          <div>
            <span>{item.content}</span>
          </div>
          <div className="subject__link">
            <Button
              type="primary"
              shape="circle"
              icon={<RightOutlined />}
              size="large"
              onClick={() => onOpenContest(item)}
            />
          </div>
        </List.Item>
      )}
    />
  )
};

Competitions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withRouter(Competitions);
