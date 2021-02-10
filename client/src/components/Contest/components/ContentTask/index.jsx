import _get from 'lodash/get';
import React, {useEffect, useState} from 'react';
import * as taskOptionsApi from '../../../../redux/api/task-options.api';
import * as answerApi from '../../../../redux/api/answer.api';
import { useFormik } from 'formik';

import {
  Radio, Input, Checkbox, Button,
  Divider, Row, Col,
  notification, Space,
} from 'antd';

import './styles.scss';
import {useParams} from "react-router-dom";

const ContestTask = (props) => {
    const {contestId} = useParams();
    const {task} = props;
    const [taskOptions, setTaskOptions] = useState([]);
    const [answerCache, setAnswerCache] = useState({});
    const [lastAnswer, setLastAnswer] = useState('');

    const saveNotification = () => {
      notification.success({
        message: 'Сохранено',
        placement: 'topRight',
      });
    };

    const errorNotification = () => {
      notification.error({
        message: 'Ошибка',
        placement: 'topRight',
      });
    };

    const answerForm = useFormik({
        initialValues: {
            answer: null
        },
        onSubmit: async (v) => {
            try {
              await answerApi.submitAnswer({
                taskId: task._id,
                contestId,
                value: answerCache[task._id],
              });
              saveNotification();
            } catch (e) {
              console.error(e);
              errorNotification();
            }
            console.log(v);
            return false;
        },
    });

    // reset form when task changes
    useEffect(async () => {
        const taskOptions = await taskOptionsApi.getByTask(task._id);
        const lastAnswerFromApi = await answerApi.getAnswer({ taskId: task._id, contestId });
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
    switch (task.type) {
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
            <Row>
              <Col span={24} style={{ paddingBottom: '16px' }}>
                <Input
                  required
                  name={"answer"}
                  placeholder="Введите ответ"
                  onChange={answerForm.handleChange}
                  value={answerForm.values.answer}
                  size="large"
                />
              </Col>
            </Row>
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
        <h3>{task.text}</h3>
        <Divider />
        <form onSubmit={answerForm.handleSubmit}>
          {lastAnswer && <p>Последний отправленный ответ: {lastAnswer}</p>}
          <Row>
            <Col span={24} xxl={16} style={{ paddingBottom: '16px' }}>
              {answerSection}
            </Col>
          </Row>
          <Row>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
            >
              Отправить
            </Button>
          </Row>
        </form>
      </div>
    );
};

ContestTask.propTypes = {};

export default ContestTask;
