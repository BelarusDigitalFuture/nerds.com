import React, {useState, useEffect} from 'react';
import {useParams, Link, useLocation} from "react-router-dom";

import { useMediaQuery } from 'react-responsive'

import * as contestApi from '../../../redux/api/contest.api';
import * as taskApi from '../../../redux/api/task.api';
import ContestTask from "./ContentTask";

import MainLayout from 'components/common/MainLayout';
import ContestCounter from 'components/ContestCounter';

import {
    PageHeader, Button, Descriptions,
    Layout, Row, Col, List,
    Tabs, Radio, Divider,
} from 'antd';

import './styles.scss';

const { TabPane } = Tabs;

const Contest = (props) => {
    const {contestId, taskId} = useParams();
    const [contest, setContest] = useState();
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('0');

    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

    const query = new URLSearchParams(useLocation().search);
    const isActiveContest = query.get('type') === 'contest';

    useEffect(async () => {
        const contest = await contestApi.getContest(contestId);
        const tasks = await taskApi.getByTaskSet(contest && contest.taskSetId);

        setContest(contest);
        setTasks(tasks);
    }, []);

    const handleNext = () => {
      setActiveTab(`${Number(activeTab) + 1}`)
    }

    if (!contest || !tasks) {
        return '';
    }

    const selectedTask = tasks.find(task => task._id === taskId);

    return (
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
    )
};

Contest.propTypes = {};

export default Contest;
