import React from 'react';
import PropTypes from 'prop-types';

import { Button, PageHeader } from 'antd';
import { ProfileTwoTone, MessageTwoTone } from '@ant-design/icons';

import logo from 'assets/geekcon_logo_circle.svg'

import './styles.scss'

const Header = (props) => {
  const { history } = props;

  const logoutUser = async () => {
    await props.logoutUser();
    history.push('/login');
  };

  const onClickIcon = () => {
    history.push('/');
  };

  const onClickUserProfile = () => {
    history.push('/profile');
  };

  return (
    <PageHeader
      style={{ position: 'fixed', zIndex: 1, width: '100%' }}
      ghost={false}
      title={
        <a className="header-logo" onClick={onClickIcon}>
          <img src={logo} />
          <span onClick={onClickIcon}>GEEKCON</span>
        </a>
      }
      subTitle={props.username}
      extra={[
        <Button key="3" type="secondary" shape="circle" icon={<ProfileTwoTone />} size="large" onClick={onClickUserProfile}/>,
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
  username: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
};

Header.defaultProps = {
  username: '',
};

export default Header;
