import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {showLocation} from 'react-native-map-link';

const initialState = {
  latitude: 37.78825,
  longitude: -122.4324,
};

const MyMap = () => {
  const [curentPosition, setCurentPosition] = useState(initialState);

  const getMyPosition = () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log(info);
        setCurentPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      e => alert(e.message),
    );
  };

  const getPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const checkPermission = fun => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      console.log(result);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          alert('This feature is not available on this device');
          break;

        case RESULTS.DENIED:
          getPermission();
          break;

        case RESULTS.GRANTED:
          console.log('The permission is granted');
          fun;
          break;

        case RESULTS.BLOCKED:
          alert('The permission is denied and not requestable anymore');
          break;
      }
    });
  };
  const test = () => {
    showLocation({
      latitude: 7.9824358,
      longitude: 80.5292226,
      sourceLatitude: 7.978141,
      sourceLongitude: 80.526654,
    });
  };

  useEffect(() => {
    return () => {
      console.log(initialState);
    };
  }, [initialState.longitude]);

  return (
    <View>
      <MapView
        style={{height: '100%', marginBottom: 0, backgroundColor: '#fff'}}
        initialRegion={{
          latitude: 7.9824358,
          longitude: 80.5292226,
          latitudeDelta: 2.5,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          onDragEnd={e => {
            setCurentPosition({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
          coordinate={{
            ...curentPosition,
          }}>
          <Callout>
            <Text>My Location</Text>
          </Callout>
        </Marker>
      </MapView>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          bottom: 0,
          padding: 10,
        }}>
        <Button
          title="MyLocation"
          onPress={() => checkPermission(getMyPosition())}
        />
        <Button
          title="SetLocation"
          onPress={() => {
            console.log(curentPosition);
            test();
          }}
        />
      </View>
    </View>
  );
};

export default MyMap;
