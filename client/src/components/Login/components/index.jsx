import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Cookies, withCookies } from 'react-cookie';

import {
  Tabs, Row, Col,
  Input, Button, Checkbox,
  Layout, DatePicker,
  notification,
} from 'antd';
import { useFormik } from 'formik';

import { LockOutlined } from '@ant-design/icons';

import logo from 'assets/geekcon_logo.svg';

import './styles.scss';

const { TabPane } = Tabs;

const Login = (props) => {
  const { history, cookies } = props;

  useEffect(() => {
    if (cookies.get('is_authenticated')) {
      history.push('/home');
    }
  });

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await props.loginUser(values);
        history.push('/home');
      } catch (e) {
        console.log(e);
      }
    },
  });

  const registerForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      school: '',
      name: '',
      city: '',
      form: '',
      birthDate: moment().subtract(1, 'year'),
    },
    onSubmit: async (values) => {
      try {
        await props.signUpUser(values);
        history.push('/home');
      } catch (e) {
        const formatErrors = JSON.parse(e.message).errors;
        
        formatErrors.map((errors, index) => {
          Object.keys(errors).map(key => {
            notification.error({
              message: formatErrors[index][key],
              placement: 'topRight',
            })
          })
        })
      }
    },
  });

  return (
    <Row justify="center">
      <Col xxl={4} xl={6} lg={8} sm={10} xs={18}>
        <div className="login">
          <div><img src={logo} className="login__logo" /></div>
          <Tabs defaultActiveKey="1" size="large" onChange={() => {}}>
            <TabPane tab="Логин" key="1">
              <form onSubmit={loginForm.handleSubmit}>
                <div className="login__element">
                  <Input
                    required
                    placeholder="E-mail"
                    type="email"
                    size="large"
                    name="email"
                    value={loginForm.values.email}
                    onChange={loginForm.handleChange}
                  />
                </div>
                <div className="login__element">
                  <Input
                    required
                    prefix={<LockOutlined />}
                    placeholder="Пароль"
                    type="password"
                    size="large"
                    name="password"
                    value={loginForm.values.password}
                    onChange={loginForm.handleChange}
                  />
                </div>
                <div className="login__element">
                  <Button type="primary" size="large" htmlType="submit" block>Войти</Button>
                </div>
              </form>
            </TabPane>
            <TabPane tab="Регистрация" key="2">
              <form onSubmit={registerForm.handleSubmit}>
                <div className="login__element">
                  <Input
                    required
                    placeholder="E-mail"
                    type="email"
                    size="large"
                    name="email"
                    value={registerForm.values.email}
                    onChange={registerForm.handleChange}
                  />
                </div>
                <div className="login__element">
                  <Input
                    required
                    prefix={<LockOutlined />}
                    placeholder="Пароль"
                    type="password"
                    size="large"
                    name="password"
                    value={registerForm.values.password}
                    onChange={registerForm.handleChange}
                  />
                </div>
                <div className="login__element">
                  <DatePicker
                    required
                    allowClear={false}
                    placeholder="Дата рождения"
                    size="large"
                    format="YYYY-MM-DD"
                    name="birthDate"
                    value={moment(registerForm.values.birthDate)}
                    onChange={(value) => registerForm.setFieldValue('birthDate', value.format('YYYY-MM-DD'))}
                  />
                </div>
                <div className="login__element">
                  <Input
                    required
                    placeholder="ФИО"
                    size="large"
                    name="name"
                    value={registerForm.values.name}
                    onChange={registerForm.handleChange}
                  />
                </div>
                <div className="login__element">
                  <Input
                    required
                    placeholder="Город"
                    size="large"
                    name="city"
                    value={registerForm.values.city}
                    onChange={registerForm.handleChange}
                  />
                </div>
                <div className="login__element">
                  <Input
                    required
                    placeholder="Учреждение образования"
                    size="large"
                    name="school"
                    value={registerForm.values.school}
                    onChange={registerForm.handleChange}
                  />
                </div>
                <div className="login__element">
                  <Input
                    required
                    placeholder="Класс"
                    size="large"
                    type="number"
                    min="0"
                    max="11"
                    name="form"
                    value={registerForm.values.form}
                    onChange={registerForm.handleChange}
                  />
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
  signUpUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(Login);
