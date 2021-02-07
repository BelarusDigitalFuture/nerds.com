import React from 'react';
import PropTypes from 'prop-types';

import {
  Tabs, Row, Col,
  Input, Button, Checkbox,
  Layout,
} from 'antd';
import { useFormik } from 'formik';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './styles.scss';

const { TabPane } = Tabs;

const Login = (props) => {
  const { history } = props;

  const form = useFormik({
    initialValues: {},
    onSubmit: () => {
      history.push('/home');
    },
  });

  return (
    <Row justify="center">
      <Col xxl={4} xl={6} lg={8} sm={10} xs={18}>
        <div className="login">
          <h1>geekcon.online</h1>
          <Tabs defaultActiveKey="1" size="large" onChange={() => {}}>
            <TabPane tab="Логин" key="1">
              <form onSubmit={form.handleSubmit}>
                <div className="login__element">
                  <Input prefix={<UserOutlined />} placeholder="Логин" size="large" />
                </div>
                <div className="login__element">
                  <Input prefix={<LockOutlined />} placeholder="Пароль" type="password" size="large" />
                </div>
                <div className="login__element">
                  <Button type="primary" size="large" htmlType="submit" block>Войти</Button>
                </div>
              </form>
            </TabPane>
            <TabPane tab="Регистрация" key="2">
              <form>
                <div className="login__element">
                  <Input prefix={<UserOutlined />} placeholder="Логин" size="large" />
                </div>
                <div className="login__element">
                  <Input prefix={<LockOutlined />} placeholder="Пароль" type="password" size="large" />
                </div>
                <div className="login__element">
                  <Input placeholder="ФИО" size="large" />
                </div>
                <div className="login__element">
                  <Input placeholder="Класс" size="large" />
                </div>
                <div className="login__element">
                  <Input placeholder="E-mail" type="email" size="large" />
                </div>
                <div className="login__element">
                  <Button type="primary" size="large" htmlType="submit" block>Регистрация</Button>
                </div>
              </form>
            </TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
