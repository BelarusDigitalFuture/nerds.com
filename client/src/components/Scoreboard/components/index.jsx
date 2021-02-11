import _ from 'lodash';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {Button, PageHeader, Table, Modal, Tabs} from 'antd';
import { useParams, Link } from "react-router-dom";
import { BellOutlined, MessageTwoTone } from '@ant-design/icons';

import MainLayout from 'components/common/MainLayout';

const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();

const { TabPane } = Tabs;

const Scoreboard = ({
  getScoreboardByContest,
  scoreboardByContest,
  scoreboardByTraining,
}) => {
  const { contestId, type } = useParams();
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    getScoreboardByContest({ contestId });
  }, []);

  const detailsModal = (data) => {
    const formatData = Object.keys(data.tasks)
      .map((item, index) => ({ name: `Задача ${index + 1}`, value: data.tasks[item] }));
    const detailColumns = [
      {
        title: 'Задание',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Баллы',
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
      title: 'Место',
      key: 'index',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Участник',
      dataIndex: 'user',
      key: 'username',
      render: user => user.name,
    },
    {
      title: 'Город',
      dataIndex: 'user',
      key: 'city',
      render: user => user.city,
    },
    {
      title: 'Учреждение образования',
      dataIndex: 'user',
      key: 'school',
      render: user => user.school,
    },
    {
      title: 'Класс',
      dataIndex: 'user',
      key: 'form',
      render: user => user.form,
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
  ];

  return (
    <ReachableContext.Provider value="Light">
      <MainLayout>
        <Tabs defaultActiveKey="1" size="large" onChange={() => {}}>
          <TabPane tab="Основное соревнование" key="1">
            <Table dataSource={scoreboardByContest} columns={mainColumns} pagination={false} />
          </TabPane>
          <TabPane tab="Тренировка" key="2">
            <Table dataSource={scoreboardByTraining} columns={mainColumns} pagination={false} />
          </TabPane>
        </Tabs>
        <br />
      </MainLayout>
      {contextHolder}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

Scoreboard.propTypes = {
  scoreboardByContest: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  scoreboardByTraining: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getScoreboardByContest: PropTypes.func.isRequired,
};

Scoreboard.defaultProps = {
  username: '',
};

export default Scoreboard;
