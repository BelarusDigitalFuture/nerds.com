import React, {useEffect, useState} from 'react';
import * as taskOptionsApi from '../../../../redux/api/task-options.api';
import { useFormik } from 'formik';

import {
    Radio, Input, List, Checkbox
} from 'antd';

import './styles.scss';

const ContestTask = (props) => {
    const {task} = props;
    const [taskOptions, setTaskOptions] = useState([]);
    // const [answer, setAnswer] = useState();

    useEffect(async () => {
        const taskOptions = await taskOptionsApi.getByTask(task._id);

        setTaskOptions(taskOptions);
    }, []);

    const answerForm = useFormik({
        initialValues: {
            selectedOption: null,
            selectedOptions: [],
            answer: '',
        },
        onSubmit: async (values) => {
            console.log(values);
            // try {
            //     await props.loginUser(values);
            //     history.push('/home');
            // } catch (e) {
            //     console.log(e);
            // }
            return false;
        },
    });


    if(!task){
        return '';
    }
    console.log(task);
    console.log(taskOptions);
    console.log(answerForm.values);

    let answerSection;
    switch(task.type){
        case "oneAnswer":
            if(!taskOptions){
                answerSection = '';
            } else {
                answerSection = (
                <Radio.Group onChange={(e) => answerForm.setFieldValue('selectedOption', e.target.value)} value={answerForm.values.selectedOption}>
                    <List
                        className="options-list-radio"
                        header={<div>Варианты</div>}
                        bordered
                        dataSource={taskOptions}
                        renderItem={taskOption => (
                            <Radio value={taskOption._id}>{taskOption.label}</Radio>
                        )}
                    />
                </Radio.Group>
                );
            }
            break;
        case "multipleAnswers":
            if(!taskOptions){
                answerSection = '';
            } else {
                // const select = (taskOptionId) => {
                //     if(!answer){
                //         setAnswer([taskOptionId]);
                //     } else {
                //         const ind = answer.indexOf(taskOptionId);
                //         if(ind === -1){
                //             setAnswer([...answer, taskOptionId]);
                //         } else {
                //             const newAnswer = [...answer];
                //             newAnswer.splice(ind, 1);
                //             setAnswer(newAnswer);
                //         }
                //     }
                // }

                answerSection = (
                    <List
                        className="options-list-checkbox"
                        header={<div>Варианты</div>}
                        bordered
                        dataSource={taskOptions}
                        renderItem={taskOption => (
                            <Checkbox name="selectedOptions" onChange={answerForm.handleChange} /*checked={answer && answer.indexOf(taskOption._id) !== -1}*/>{taskOption.label}</Checkbox>
                        )}
                    />
                );
            }
            break;
        // case "fillIn":
        //     answerSection = (
        //         <Input value={answer} onChange={(e) => setAnswer(e.target.value)} />
        //     );
        //     break;
        // case "essay":
        //     answerSection = (
        //         <Input.TextArea rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} />
        //     );
        //     break;
        //
        // default:
        //     answerSection = '';
    }

    return (
        <div>
            <p>{task.text}</p>
            {answerSection}
        </div>
    );
};

ContestTask.propTypes = {};

export default ContestTask;
