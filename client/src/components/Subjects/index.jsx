import React from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';

import MainLayout from 'components/common/MainLayout';
import BelLang from 'components/Subjects/BelLang';

const Subjects = (props) => {
  const { name } = useParams();

  function renderSubject() {
    switch (name) {
      case 'belmova': return <BelLang />;
      default: return <></>;
    }
  }

  return (
    <MainLayout>
      {renderSubject()}
    </MainLayout>
  );
};

Subjects.propTypes = {

};

export default Subjects;
