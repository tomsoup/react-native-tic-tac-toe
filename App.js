import React from 'react';
import { StyleSheet, Image, Text, View, Linking, TouchableWithoutFeedback  } from 'react-native';
import Board from './components/Board';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Board />
        <TouchableWithoutFeedback
          onPress={
            () => Linking.openURL('http://tomsoup.io')
          }
        >
          <Image
            source={{ uri: 'https://tomsoup.io/assets/main/logo-720f2d15bae63d48bdab913a18af3c4deb143b51fe4d1c5cc8c2047ff6cdecbc.png' }}
            style={{ width: 30, height: 30, position: 'absolute', bottom: 10 }}
          />
     </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdef',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
