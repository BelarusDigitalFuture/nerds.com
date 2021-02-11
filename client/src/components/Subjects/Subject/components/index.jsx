import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { PageHeader, Button, Divider } from 'antd'

import Competitions from 'components/Competitions'
import Trainings from 'components/Trainings'

const Subject = ({
  getContestList,
  contestList,
  trainingList,
  title
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
    </div>
  )
};

Subject.propTypes = {
  getContestList: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  contestList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  trainingList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Subject;
