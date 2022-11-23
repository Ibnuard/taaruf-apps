import * as React from 'react';
import {
  View,
  Text,
  Platform,
  UIManager,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ANIMATION_SPRING_CONFIG} from '../../helpers/constants';
import {Colors} from '../../styles';
import Row from '../row';
import Touchable from '../touchable';
import styles from './styles';

const Dropdown = ({
  title = 'title',
  style,
  onItemSelected,
  data = [],
  captionStyle,
  caption,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();

  React.useEffect(() => {
    onItemSelected ? onItemSelected(selectedItem) : null;
  }, [selectedItem]);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const testList = [
    'Haloo 1',
    'Haloo 2',
    'Haloo 3',
    'Haloo 4',
    'Haloo 1',
    'Haloo 2',
    'Haloo 3',
    'Haloo 4',
  ];

  return (
    <View style={[style, {width: '100%'}]}>
      {caption && (
        <Text style={[captionStyle, styles.textCaption]}>
          {caption ?? 'Caption'}
        </Text>
      )}
      <Touchable
        style={styles.container}
        onPress={() => {
          LayoutAnimation.configureNext(ANIMATION_SPRING_CONFIG);
          setExpanded(!expanded);
        }}>
        <Row style={{alignItems: 'center'}}>
          <Text numberOfLines={1} style={styles.textDropdown}>
            {selectedItem ? selectedItem : title}
          </Text>
          <Icon name={expanded ? 'up' : 'down'} color={Colors.COLOR_BLACK} />
        </Row>
      </Touchable>
      {expanded && (
        <ScrollView
          nestedScrollEnabled
          style={styles.childMap}
          contentContainerStyle={styles.scroll}>
          {data.map((item, index) => {
            return (
              <Touchable
                style={styles.childItem}
                onPress={() => {
                  setSelectedItem(item);
                  LayoutAnimation.configureNext(ANIMATION_SPRING_CONFIG);
                  setExpanded(!expanded);
                }}>
                <Text style={styles.textItem}>{item}</Text>
              </Touchable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Dropdown;
