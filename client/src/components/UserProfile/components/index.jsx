import _ from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Tabs, Row, Col,
  Input, Button, Checkbox,
  Layout, DatePicker, notification,
} from 'antd';
import { useFormik } from 'formik';

import { LockOutlined } from '@ant-design/icons';

const FORM_KEYS = ['email', 'name', 'school', 'birthDate'];

const UserProfile = (props) => {
  const { user } = props;
  const profileForm = useFormik({
    initialValues: {
      ..._.pick(user, FORM_KEYS),
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await props.updateUser(values);
        notification.info({
          message: 'Данные обновлены',
          placement: 'topRight',
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <Row justify="center">
      <Col xxl={4} xl={6} lg={8} sm={10} xs={18}>
        <div className="login">
          <h1>{props.user.name}</h1>
          <form onSubmit={profileForm.handleSubmit}>
            <div className="login__element">
              <Input
                placeholder="E-mail"
                type="email"
                size="large"
                name="email"
                value={profileForm.values.email}
                onChange={profileForm.handleChange}
              />
            </div>
            <div className="login__element">
              <Input
                prefix={<LockOutlined />}
                placeholder="Пароль"
                type="password"
                size="large"
                name="password"
                value={profileForm.values.password}
                onChange={profileForm.handleChange}
              />
            </div>
            <div className="login__element">
              <DatePicker
                placeholder="Дата рождения"
                size="large"
                format="YYYY-MM-DD"
                name="birthDate"
                value={moment(profileForm.values.birthDate)}
                onChange={(value) => profileForm.setFieldValue('birthDate', value.format('YYYY-MM-DD'))}
              />
            </div>
            <div className="login__element">
              <Input
                placeholder="ФИО"
                size="large"
                name="name"
                value={profileForm.values.name}
                onChange={profileForm.handleChange}
              />
            </div>
            <div className="login__element">
              <Input
                placeholder="Класс"
                size="large"
                name="school"
                value={profileForm.values.school}
                onChange={profileForm.handleChange}
              />
            </div>
            <div className="login__element">
              <Button type="primary" size="large" htmlType="submit" block>Обновить данные</Button>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
};

UserProfile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default UserProfile;
