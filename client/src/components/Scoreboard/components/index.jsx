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

  const formatTasks = taskIds
    .map((item, index) => ({
      id: item,
      taskName: `Задание ${index + 1}`,
      value: scoreboard[0].tasks[item]
    }))

  console.log('scoreboard', scoreboard)

  const mainColumns = [
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
    {
      title: 'Итог',
      dataIndex: 'total',
      key: 'total',
    },
  ]

  const columns = [
    {
      title: 'Задача',
      key: 'taskName',
      render: item => (
        <Link to={`/contest/${contestId}/task/${item.id}`}>{item.taskName}</Link>
      ),
    },
    {
      title: 'Баллы',
      dataIndex: 'value',
      key: 'value',
    },
    // ...taskIds.map((taskId, index) => ({
    //   title: <Link to={`/contest/${contestId}/task/${taskId}`}>Задание {index}</Link>,
    //   dataIndex: 'tasks',
    //   render: tasks => tasks[taskId],
    // })),
  ];

  return (
    <MainLayout>
      <Table dataSource={scoreboard} columns={mainColumns} pagination={false} />
      <br />
      <Table dataSource={formatTasks} columns={columns} />
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
