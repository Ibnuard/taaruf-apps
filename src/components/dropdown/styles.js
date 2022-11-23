import {StyleSheet} from 'react-native';
import {Colors, Scaler, Size, Typo} from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
    minHeight: Scaler.scaleSize(42),
    width: '100%',
    borderRadius: 4,
    paddingHorizontal: Size.SIZE_14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  childMap: {
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxHeight: 176,
    borderRadius: 8,
  },

  childItem: {
    height: 42,
    marginVertical: 4,
    justifyContent: 'center',
    borderRadius: 8,
  },

  scroll: {
    paddingBottom: 30,
  },

  //textSTyle

  textDropdown: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_BLACK,
    flex: 1,
    marginRight: 8,
  },

  textItem: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_BLACK,
  },

  textCaption: {
    ...Typo.TextSmallBold,
    color: Colors.COLOR_DARK_GRAY,
    marginBottom: Size.SIZE_12,
    alignSelf: 'flex-start',
  },
});

export default styles;
