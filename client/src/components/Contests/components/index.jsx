import moment from 'moment'
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import { List, Space } from 'antd';
import {withRouter} from "react-router-dom";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Contests = ({ getContestsBySubject, contests, history }) => {
  useEffect(() => {
    getContestsBySubject({ subjectId: '', page: 1 });
  }, []);

  const onOpenContest = (contestId) => {
    history.push(`/contest/${contestId}`);
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          getContestsBySubject({ subjectId: '', page });
        },
        pageSize: 3,
      }}
      dataSource={contests}
      renderItem={item => (
        <List.Item
          key={item._id}
          actions={[
            <>{item.status}</>,
          ]}
        >
          <List.Item.Meta
            title={<a onClick={() => onOpenContest(item._id)}>{item.description}</a>}
            description={
              `Дата старта: ${moment(item.startDate).format('YYYY-MM-DD hh:mm:ss')}
              Дата окончания: ${moment(item.endDate).format('YYYY-MM-DD hh:mm:ss')}
            `}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
};

Contests.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getContestsBySubject: PropTypes.func.isRequired,
  contests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withRouter(Contests);
