import React from 'react';
import { StyleSheet, Image, Text, View, Linking, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Board from './components/Board';
import { emptyCells, calculateWinner, getRandomIntInclusive } from './helper/futureSight';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        cells: Array(9).fill(null),
      }],
      currentPlayer: 'X',
      playerOne: 'X',
      playerTwo: 'O',
      stepNumber: 0
    };
  }

  componentWillUpdate = (nextProps, nextState) => {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    //Check if next play is O
    if (nextState.currentPlayer === this.state.playerTwo) {
      const position = this.minimax(current.cells, this.state.currentPlayer);
      this.addMark(position.index);
    }
  }

  addMark = (position) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    //slice to avoid state mutation
    const cells = current.cells.slice();
    //Stop if winner or cell position is occupied
    if (calculateWinner(cells, this.state.currentPlayer) || cells[position]) {
      return;
    }
    // short hand to determine x or o
    cells[position] = this.state.currentPlayer;
    this.setState({ history: history.concat([{
      cells
    }]),
    currentPlayer: nextPlayer,
    stepNumber: history.length });
  }

  restart = (step) => {
  const currentPlayer = (step % 2) === 0 ? 'X' : 'O';
    this.setState({
      stepNumber: step,
      currentPlayer
    });
  }

  minimax = (currentBoard, currentPlayer) => {
    const { playerOne, playerTwo } = this.state;
  //available spots
    const availSpots = emptyCells(currentBoard);
    if (calculateWinner(currentBoard, playerOne)) {
      return {
        score: -10
      };
    } else if (calculateWinner(currentBoard, playerTwo)) {
      return {
        score: 10
      };
    } else if (availSpots.length === 0) {
      return {
        score: 0
      };
    }
    const virtualBoard = currentBoard.slice();
    // an array to collect all the objects
    const moves = [];

    if (availSpots.length >= 8) {
      const move = {};
      move.index = getRandomIntInclusive(0, 8);
      move.score = 0;
      return move;
    }
    // loop through available spots
    availSpots.forEach((cell, index) => {
      const move = {};
      //create an object for each and store the index of that spot
      move.index = availSpots[index];
      // set the empty spot to the current player
      virtualBoard[availSpots[index]] = currentPlayer;
      /*collect the score resulted from calling minimax
        on the opponent of the current player*/
      if (currentPlayer === playerTwo) {
        const result = this.minimax(virtualBoard, playerOne);
        move.score = result.score;
      } else {
        const result = this.minimax(virtualBoard, playerTwo);
        move.score = result.score;
      }
      // reset the spot to empty
      virtualBoard[availSpots[index]] = move.index;
      // push the object to the array
      moves.push(move);
    }
  );

    let bestMove;
    if (currentPlayer === playerTwo) {
      let bestScore = -10000;
      moves.forEach((move, index) => {
        if (moves[index].score > bestScore) {
            bestScore = moves[index].score;
            bestMove = index;
          }
      });
    } else {
    // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      moves.forEach((move, index) => {
        if (moves[index].score < bestScore) {
            bestScore = moves[index].score;
            bestMove = index;
          }
      });
    }

    // return the chosen move (object) from the moves array
    // return bestMove;
    return moves[bestMove];
  };


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const lastPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    const winner = calculateWinner(current.cells, lastPlayer);
    let turn = `${this.state.currentPlayer} is next`;
    const draw = current.cells.includes(null);
    if (winner) {
      turn = `${lastPlayer} is the winner`;
    } else if (!draw) {
      turn = 'Draw';
    }

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 34, color: '#0a0a0a' }}>
          {turn}
        </Text>
        <TouchableHighlight
          activeOpacity={1}
          style={{
            backgroundColor: '#6e19a2', marginVertical: 50, paddingHorizontal: 20
          }}
          underlayColor='#8352a0'
          onPress={
            () => this.restart(0)
          }
        >
          <Text style={{ fontSize: 34, color: 'white' }}>Restart </Text>
        </TouchableHighlight>
        <Board
          cells={current.cells}
          onCellPress={
            position => this.addMark(position)
          }
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
