import _ from 'lodash';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import { Button, PageHeader, Table, Modal } from 'antd';
import { useParams, Link } from "react-router-dom";
import { BellOutlined, MessageTwoTone } from '@ant-design/icons';

import MainLayout from 'components/common/MainLayout';

const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();

const Scoreboard = ({ getScoreboardByContest, scoreboard }) => {
  const { contestId } = useParams();
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    getScoreboardByContest({ contestId });
  }, []);

  const detailsModal = (data) => {
    const formatData = Object.keys(data.tasks)
      .map((item, index) => ({ name: `Задача ${index + 1}`, value: data.tasks[item] }))
    const detailColumns = [
      {
        title: 'Задание',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Школа',
        dataIndex: 'value',
        key: 'value',
        render: value => value.toFixed(2),
      },
    ]

    modal.info({
      title: 'Отчёт',
      content: (
        <>
          <br />
          <Table
            dataSource={formatData}
            columns={detailColumns}
            pagination={false}
            scroll={{ y: 240 }}
          />
        </>
      ),
    })
  }

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
      render: v => v.toFixed(2),
    },
    {
      title: 'Подробно',
      render: data => <Button onClick={() => detailsModal(data)}>Подробнее</Button>,
    },
  ]

  return (
    <ReachableContext.Provider value="Light">
      <MainLayout>
        <Table dataSource={scoreboard} columns={mainColumns} pagination={false} />
        <br />
      </MainLayout>
      {contextHolder}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
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
