import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  PageHeader, Button, Descriptions,
  Layout, Row, Col, Divider,
} from 'antd';

import MainLayout from 'components/common/MainLayout';
import News from 'components/News';

import SUBJECTS from 'consts/subjects';

import './styles.scss';

const Home = (props) => {
  return (
    <MainLayout>
      <Row align="center" gutter={[16, 16]}>
        {SUBJECTS.map((item, index) => (
          <Col key={index}>
            <Link to={item.path}>
              <Button type="primary" shape="round" size="large" disabled={item.disabled}>
                {item.name}
              </Button>
            </Link>
          </Col>
        ))}
      </Row>
      <Divider>Новости</Divider>
      <News />
    </MainLayout>
  );
};

Home.propTypes = {

};

export default Home;
