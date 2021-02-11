import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import {PageHeader, Button, Divider, List} from 'antd'

import Competitions from 'components/Competitions'
import Trainings from 'components/Trainings'
import {Link} from "react-router-dom";

const Subject = ({
  getContestList,
  contestList,
  trainingList,
  title,
  history,
}) => {
  useEffect(() => {
    getContestList()
  }, []);

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={title}
        extra={[
          <Button key="1" type="primary">
            Добавить
          </Button>,
        ]}
        style={{ padding: 0 }}
      />
      <Divider />
      <h2>Соревнования</h2>
      <Competitions data={contestList} />
      {trainingList.length ?
        <>
          <h2>Тренировки</h2>
          <Trainings data={trainingList} />
        </>
        : null
      }
      <h2>Материалы для подготовки</h2>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={[
          {
            key: '1',
            title: 'Злучнік як часціна мовы'
          },
          {
            key: '2',
            title: 'Знакі прыпынку: сказы з адасобленымі дапаўненнямі'
          },
        ]}
        renderItem={(item, index) => (
          <List.Item
            key={index}
          >
            <List.Item.Meta
              avatar={index + 1}
              title={<a onClick={() => history.push(`/materials/${item.key}`)}>{item.title}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  )
};

Subject.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getContestList: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  contestList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  trainingList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Subject;
