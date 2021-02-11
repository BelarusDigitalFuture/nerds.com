import React from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';

import MainLayout from 'components/common/MainLayout';
import Subject from 'components/Subjects/Subject';

const Subjects = (props) => {
  const { name } = useParams();

  return (
    <MainLayout>
      <Subject title={'Беларуская мова'} />
    </MainLayout>
  );
};

Subjects.propTypes = {

};

export default Subjects;
