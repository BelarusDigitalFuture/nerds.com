import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import './styles.scss';

const MainLayout = (props) => {
  const { children } = props;

  return (
    <Row align="center">
      <Col xxl={16} xl={16} lg={16} sm={10} xs={22}>
        <div className="main">
          {children}
        </div>
      </Col>
    </Row>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
