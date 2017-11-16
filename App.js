import React from 'react';
import { StyleSheet, Image, Text, View, Linking, TouchableHighlight, TouchableWithoutFeedback  } from 'react-native';
import Board from './components/Board';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        cells: Array(9).fill(null),
      }],
      //playerOne will be X
      playerOne: true,
      stepNumber: 0,
    };
  }

  calculateWinner = (cells) => {
    const conditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < conditions.length; i++) {
      const [a, b, c] = conditions[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  }

  addMark = (position) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    //slice to avoid state mutation
    const cells = current.cells.slice();
    if (this.calculateWinner(cells) || cells[position]) {
      return;
    }
    // short hand to determine x or o
    cells[position] = this.state.playerOne ? 'X' : 'O';
    this.setState({history: history.concat([{
      cells
    }]), playerOne: !this.state.playerOne, stepNumber: history.length });
  }

  restart = (step) => {
    this.setState({
      stepNumber: step,
      playerOne: (step % 2) === 0,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.cells);


    let status;
      if (winner) {
          console.log(`${winner} Wins!`);
      } else {
          console.log('keep playing');
      }

    return (
      <View style={styles.container}>
        <TouchableHighlight
          activeOpacity={1}
          style={{
            backgroundColor: 'green'
          }}
          underlayColor='transparent'
          onPress={
            () => this.restart(0)
          }
        >
          <Text>Reset </Text>
        </TouchableHighlight>
        <Board cells = {current.cells}
          onCellPress= {(position) => {this.addMark(position)}}
        />
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
