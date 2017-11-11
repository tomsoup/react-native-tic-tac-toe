import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from './components/Board';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Board />
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
