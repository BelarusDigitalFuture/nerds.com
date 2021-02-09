import React from 'react';
import PropTypes from 'prop-types';

import { Button, PageHeader } from 'antd';
import { BellOutlined, MessageTwoTone } from '@ant-design/icons';

const Header = (props) => {
  const { history } = props;

  const logoutUser = async () => {
    await props.logoutUser();
    history.push('/login');
  };

  const onClickIcon = () => {
    history.push('/');
  };

  return (
    <PageHeader
      style={{ position: 'fixed', zIndex: 1, width: '100%' }}
      ghost={false}
      title={<a onClick={onClickIcon}>GEEKCON</a>}
      extra={[
        <Button key="3" type="primary" shape="circle" icon={<BellOutlined />} size="large" />,
        <Button key="2" type="secondary" shape="circle" icon={<MessageTwoTone />} size="large" />,
        <Button key="1" type="primary" onClick={logoutUser}>
          Выйти
        </Button>,
      ]}
    >
    </PageHeader>
  );
};

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default Header;
