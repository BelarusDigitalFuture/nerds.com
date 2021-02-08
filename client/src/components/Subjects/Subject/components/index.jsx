import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { PageHeader, Button, Divider } from 'antd'

import Competitions from 'components/Competitions'
import TrainingList from 'components/Subjects/TrainingList'

import { BEL_LANG_TASKS } from 'consts/tasks'

const Subject = ({
  getContestList,
  contestList,
}) => {
  useEffect(() => {
    getContestList()
  }, [])

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Белорусский язык"
        subTitle="описание"
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
      <h2>Тренировки</h2>
      <TrainingList listData={BEL_LANG_TASKS} />
    </div>
  )
};

Subject.propTypes = {
  getContestList: PropTypes.func.isRequired,
  contestList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Subject;
