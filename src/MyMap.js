import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const initialState = {
  latitude: 37.78825,
  longitude: -122.4324,
};

const MyMap = () => {
  const [curentPosition, setCurentPosition] = useState(initialState);

  getMyPosition = () => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      setCurentPosition({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    });
  };

  return (
    <View>
      <MapView
        style={{height: 700, marginTop: 10}}
        initialRegion={{
          latitude: 7.9824358,
          longitude: 80.5292226,
          latitudeDelta: 2.5,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            ...curentPosition,
          }}
          image={require('./icon/Location.png')}
        />
      </MapView>
      <Button title="test" onPress={() => getMyPosition()} />
    </View>
  );
};

export default MyMap;
