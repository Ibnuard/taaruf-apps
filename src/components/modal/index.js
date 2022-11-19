import * as React from 'react';
import Modal from 'react-native-modal';
import ModalLoading from './type/loading';
import styles from './styles';
import ModalPopUp from './type/popup';
import ModalPopUpThreeButton from './type/popupthreebutton';

const ModalView = ({ children, visible = false, type, onPress, onOptionButtonPress, onModalHide }) => {
  //render modal children
  const renderContent = () => {
    switch (type) {
      case 'loading':
        return <ModalLoading />;
        break;
      case 'popup':
        return <ModalPopUp onButtonPress={onPress} />;
        break;
      case 'popup3b':
        return <ModalPopUpThreeButton onButtonPress={onPress} onOptionButtonPress={onOptionButtonPress} />;
        break;
      default:
        return children;
        break;
    }
  };

  return (
    <Modal
      isVisible={visible}
      useNativeDriver
      style={styles.container}
      onModalHide={onModalHide}>
      {renderContent()}
    </Modal>
  );
};

export default ModalView;
