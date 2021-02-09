import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  PageHeader, Button, Descriptions,
  Layout, Row, Col, Divider,
} from 'antd';

import MainLayout from 'components/common/MainLayout';
import News from 'components/News';

import './styles.scss';

const Home = ({ getSubjects, subjects }) => {

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <MainLayout>
      <Row align="center" gutter={[16, 16]}>
        {subjects.map((item, index) => (
          <Col key={index}>
            <Link to={`subject/${item._id}`}>
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
  getSubjects: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
