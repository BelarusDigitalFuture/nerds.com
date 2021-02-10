import _ from 'lodash';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import { Button, PageHeader, Table } from 'antd';
import { useParams, Link } from "react-router-dom";
import { BellOutlined, MessageTwoTone } from '@ant-design/icons';

import MainLayout from 'components/common/MainLayout';

const Scoreboard = ({ getScoreboardByContest, scoreboard }) => {
  const { contestId } = useParams();

  useEffect(() => {
    getScoreboardByContest({ contestId });
  }, []);

  const taskIds = Object.keys(_.get(scoreboard, '[0].tasks', {}));

  const columns = [
    {
      title: 'Участник',
      dataIndex: 'user',
      key: 'username',
      render: user => user.name,
    },
    {
      title: 'Школа',
      dataIndex: 'user',
      key: 'school',
      render: user => user.school,
    },
    ...taskIds.map((taskId, index) => ({
      title: <Link to={`/contest/${contestId}/task/${taskId}`}>Задание {index}</Link>,
      dataIndex: 'tasks',
      render: tasks => tasks[taskId],
    })),
    {
      title: 'Итог',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <MainLayout>
      <Table dataSource={scoreboard} columns={columns} />
    </MainLayout>
  );
};

Scoreboard.propTypes = {
  scoreboard: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getScoreboardByContest: PropTypes.func.isRequired,
};

Scoreboard.defaultProps = {
  username: '',
};

export default Scoreboard;
