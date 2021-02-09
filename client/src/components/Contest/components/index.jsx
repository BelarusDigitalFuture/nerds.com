import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import * as contestApi from '../../../redux/api/contest.api';
import * as taskApi from '../../../redux/api/task.api';
import ContestTask from "./ContentTask";

import {
    PageHeader, Button, Descriptions,
    Layout, Row, Col, List
} from 'antd';

import './styles.scss';

const Contest = (props) => {
    const {contestId, taskId} = useParams();
    const [contest, setContest] = useState();
    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        const contest = await contestApi.getContest(contestId);
        const tasks = await taskApi.getByTaskSet(contest && contest.taskSetId);

        setContest(contest);
        setTasks(tasks);
    }, []);

    if (!contest || !tasks) {
        return '';
    }

    const selectedTask = tasks.find(task => task._id === taskId);

    return (
        <Row align="center">
            <Col xs={6}>
                <List
                    className="task-list"
                    header={<div>Вопросы</div>}
                    bordered
                    dataSource={tasks}
                    renderItem={task => (
                        <List.Item>
                            <Link
                                to={{pathname: `/contest/${contestId}/task/${task._id}`}}
                                className={task._id === taskId ? 'selected' : ''}
                            >
                                {task.text}
                            </Link>
                        </List.Item>
                    )}
                />
            </Col>
            <Col xs={18}>
                {selectedTask ? <ContestTask task={selectedTask}/> : ''}
            </Col>
        </Row>
    );
};

Contest.propTypes = {};

export default Contest;
