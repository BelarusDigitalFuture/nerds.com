import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import { Button, PageHeader, Table } from 'antd';
import { useParams } from "react-router-dom";
import { BellOutlined, MessageTwoTone } from '@ant-design/icons';

import MainLayout from 'components/common/MainLayout';

const Scoreboard = ({ getScoreboardByContest, scoreboard }) => {
  const { contestId } = useParams();

  useEffect(() => {
    getScoreboardByContest({ contestId });
  }, []);

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
