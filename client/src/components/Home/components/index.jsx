import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  PageHeader, Button, Descriptions,
  Layout, Row, Col,
} from 'antd';

import SUBJECTS from 'consts/subjects';

import './styles.scss';

const Home = (props) => {
  return (
    <Row align="center">
      <Col xxl={16} xl={6} lg={8} sm={10} xs={18}>
        <div className="main">
          <Row align="center" gutter={[16, 16]}>
            {SUBJECTS.map((item, index) => (
              <Col key={index}>
                <Link to={item.path}>
                  <Button type="primary" shape="round" size="large">
                    {item.name}
                  </Button>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

Home.propTypes = {

};

export default Home;
