import * as React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../styles';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const FotoScreen = ({navigation, route}) => {
  const DATA = route?.params?.foto;

  const {width} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Carousel
          loop={true}
          autoPlay={true}
          style={{width: width, height: 480}}
          width={width}
          data={DATA}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          renderItem={({item, index}) => {
            return (
              <Image
                style={styles.foto}
                source={{uri: `data:image/png;base64,${item}`}}
              />
            );
          }}
          scrollAnimationDuration={1500}
          autoPlayInterval={5000}
        />
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COLOR_BLACK,
  },

  foto: {
    width: '100%',
    height: 480,
  },
});

export default FotoScreen;
