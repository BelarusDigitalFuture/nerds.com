import React from 'react';
import PropTypes from 'prop-types';

import { Button, PageHeader } from 'antd';
import { BellOutlined, MessageTwoTone } from '@ant-design/icons';

const Header = (props) => {
  const { history } = props;

  return (
    <PageHeader
      ghost={false}
      title="GEEKCON"
      extra={[
        <Button key="3" type="primary" shape="circle" icon={<BellOutlined />} size="large" />,
        <Button key="2" type="secondary" shape="circle" icon={<MessageTwoTone />} size="large" />,
        <Button key="1" type="primary" onClick={() => history.push('/login')}>
          Выйти
        </Button>,
      ]}
    >
    </PageHeader>
  );
};

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
