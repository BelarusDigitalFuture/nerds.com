import _get from 'lodash/get';
import React, {useEffect, useState} from 'react';
import * as taskOptionsApi from '../../../../redux/api/task-options.api';
import * as answerApi from '../../../../redux/api/answer.api';
import { useFormik } from 'formik';

import { Radio, Input, Checkbox, Button } from 'antd';

import './styles.scss';
import {useParams} from "react-router-dom";

const ContestTask = (props) => {
    const {contestId, taskId} = useParams();
    const {task} = props;
    const [taskOptions, setTaskOptions] = useState([]);
    const [answerCache, setAnswerCache] = useState({});
    const [lastAnswer, setLastAnswer] = useState('');

    const answerForm = useFormik({
        initialValues: {
            answer: null
        },
        onSubmit: async (v) => {
            try {
              await answerApi.submitAnswer({
                taskId,
                contestId,
                value: answerCache[task._id],
              });
            } catch (e) {
              console.error(e);
            }
            delete answerCache[task._id];
            setAnswerCache({...answerCache});
            console.log(v);
            return false;
        },
    });

    // reset form when task changes
    useEffect(async () => {
        const taskOptions = await taskOptionsApi.getByTask(task._id);
        const lastAnswerFromApi = await answerApi.getAnswer({ taskId, contestId });
        if (['multipleAnswers'].includes(task.type)) {
          const lastAnswerValue = taskOptions
            .filter(o => _get(lastAnswerFromApi, 'value', []).includes(o._id))
            .map(o => o.label)
            .join(', ');
          setLastAnswer(lastAnswerValue)
        } else {
          setLastAnswer(lastAnswerFromApi.value)
        }
        setTaskOptions(taskOptions);
        await answerForm.resetForm({values: {answer: answerCache[task._id]}});

    }, [task]);

    // update answerCache when answer changes
    useEffect(() => {
        setAnswerCache({
            ...answerCache,
            [task._id]: answerForm.values.answer
        })
    }, [answerForm.values.answer]);

    if(!task){
        return '';
    }

    let answerSection;
    switch(task.type){
        case "oneAnswer":
            if(!taskOptions){
                answerSection = '';
            } else {
                const options = taskOptions.map(x => {return {label: x.label, value: x._id}});

                answerSection = (
                    <Radio.Group name={"answer"} options={options} onChange={answerForm.handleChange} value={answerForm.values.answer} />
                );
            }
            break;
        case "multipleAnswers":
            if(!taskOptions){
                answerSection = '';
            } else {
                const options = taskOptions.map(x => {return {label: x.label, value: x._id}});

                answerSection = (
                    <Checkbox.Group options={options} onChange={value => answerForm.setFieldValue('answer', value)} value={answerForm.values.answer} />
                );
            }
            break;
        case "fillIn":
            answerSection = (
                <Input name={"answer"} onChange={answerForm.handleChange} value={answerForm.values.answer} />
            );
            break;
        case "essay":
            answerSection = (
                <Input.TextArea rows={4} name={"answer"} onChange={answerForm.handleChange} value={answerForm.values.answer} />
            );
            break;
        default:
            answerSection = '';
    }

    return (
        <div>
            <p>{task.text}</p>
            <form onSubmit={answerForm.handleSubmit}>
                {lastAnswer && <p>Последний отправленный ответ: {lastAnswer}</p>}
                {answerSection}
                <div className="">
                    <Button type="primary" size="large" htmlType="submit" block>Отправить</Button>
                </div>
            </form>
        </div>
    );
};

ContestTask.propTypes = {};

export default ContestTask;
