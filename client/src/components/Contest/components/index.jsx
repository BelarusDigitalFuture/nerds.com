import React, {useState, useEffect} from 'react';
import moment from 'moment';
import _ from 'lodash';
import {useParams, Link, useLocation, withRouter} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import * as contestApi from '../../../redux/api/contest.api';
import * as taskApi from '../../../redux/api/task.api';
import ContestTask from "./ContentTask";

import MainLayout from 'components/common/MainLayout';
import ContestCounter from 'components/ContestCounter';

import {
  PageHeader, Button, Descriptions,
  Layout, Row, Col, List,
  Tabs, Radio, Divider, Table, Modal,
} from 'antd';

import './styles.scss';


const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();

const { TabPane } = Tabs;

const Contest = (props) => {
    const {contestId, taskId} = useParams();
    const [contest, setContest] = useState();
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('0');

    const [modal, contextHolder] = Modal.useModal();

    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

    const query = new URLSearchParams(useLocation().search);
    const isActiveContest = query.get('type') === 'contest';

    useEffect(async () => {
        const contest = await contestApi.getContest(contestId);
        if (!_.get(contest, 'startDate') || moment().isBefore(moment(contest.startDate))) {
          props.history.push('/home');
          return;
        }
        const tasks = await taskApi.getByTaskSet(contest && contest.taskSetId);
        setContest(contest);
        setTasks(tasks);

        modal.info({
          title: 'Начинаем соревнование!',
          content: (
            <>
              Добро пожаловать в соревнование по белорусскому языку. Соревнование состоит из {tasks.length} заданий. Вы можете посылать ответы на каждое задание любое количество раз. Будет засчитан последний ответ. Не забудьте включить белорусскую раскладку клавиатуры. Удачи!
            </>
          ),
        });
    }, []);

    const handleNext = () => {
      if (+activeTab === tasks.length - 1) {
        modal.success({
          title: 'Поздравляем!',
          content: (
            <>
              Поздравляем, вы справились со всеми заданиями! Результаты будут доступны по окончанию соревнования. Вы ещё можете посылать ответы любое количество раз до окончания соревнования.
            </>
          ),
          okText: 'Закончить',
          closable: true,
          onOk: () => window.history.back(),
        });
        setActiveTab('0')
      } else {
        setActiveTab(`${Number(activeTab) + 1}`)
      }
    };

    if (!contest || !tasks) {
        return '';
    }

    const selectedTask = tasks.find(task => task._id === taskId);

    return (
      <ReachableContext.Provider value="Light">
        <MainLayout>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Назад"
            style={{ padding: 0 }}
            extra={[
              isActiveContest ? <ContestCounter key="1" endDate={contest.endDate} /> : <></>
            ]}
          />
          <Divider />
          <div>
            <Tabs
              defaultActiveKey={activeTab}
              activeKey={activeTab}
              tabPosition={isMobile ? 'top' : 'left'}
              style={{ height: isMobile ? 'auto' : 500 }}
              onChange={setActiveTab}
            >
              {(tasks || []).map((item, index) => (
                <TabPane tab={`Задание ${index + 1}`} key={index}>
                  <ContestTask task={item} handleNext={handleNext} />
                </TabPane>
              ))}
            </Tabs>
          </div>
        </MainLayout>
        {contextHolder}
        <UnreachableContext.Provider value="Bamboo" />
      </ReachableContext.Provider>
    )
};

Contest.propTypes = {};

export default withRouter(Contest);
