import * as React from 'react';
import {Modal} from '.';

const LoadingModal = ({isLoading}) => {
  return <Modal type={'loading'} visible={isLoading} />;
};

export default LoadingModal;
