import React from 'react';
import PropTypes from 'prop-types';

import { BellOutlined } from '@ant-design/icons';

import {
  PageHeader, Button, Descriptions,
  Layout, Row, Col,
} from 'antd';

import './styles.scss';

const Home = (props) => {
  return (
    <Row align="center">
      <Col xxl={16} xl={6} lg={8} sm={10} xs={18}>
        <div className="main">test123</div>
      </Col>
    </Row>
  );
};

Home.propTypes = {

};

export default Home;
