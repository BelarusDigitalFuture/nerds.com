import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  List, notification, Space,
  Button,
} from 'antd';
import { withRouter, Link } from "react-router-dom";

const Trainings = ({ data, history }) => {
  const onOpenTraining = (contest) => {
    history.push(`/contest/${contest._id}?type=training`);
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        hideOnSinglePage: true,
        pageSize: 3,
      }}
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          actions={[
            <>Тренировка для дорешивания</>
          ]}
        >
          <List.Item.Meta
            title={<a onClick={() => onOpenTraining(item)}>{item.description}</a>}
          />
          <div>
            <span>{item.content}</span>
            {(
              <>
                <Link to={`/contest/${item._id}/scoreboard`}>
                  <Button>Результаты</Button>
                </Link>
              </>
            )}
          </div>
        </List.Item>
      )}
    />
  )
};

Trainings.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withRouter(Trainings);