import React from 'react';
import { StyleSheet, Image, Text, View, Linking, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Board from './components/Board';
import { emptyCells, calculateWinner } from './helper/futureSight';

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
    }]), currentPlayer: nextPlayer, stepNumber: history.length });
  }

  restart = (step) => {
  const currentPlayer = (step % 2) === 0 ? 'X' : 'O';
    this.setState({
      stepNumber: step,
      currentPlayer
    });
  }

  minimax = (currentBoard, currentPlayer, futureSight = 0, maxFutureSight = 300) => {
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
    } else if (availSpots.length === 0 || futureSight > maxFutureSight) {
      return {
        score: 0
      };
    }
    const virtualBoard = currentBoard.slice();
    // an array to collect all the objects
    let moves = [];
    // loop through available spots
    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      //create an object for each and store the index of that spot
      move.index = availSpots[i];
      // set the empty spot to the current player
      virtualBoard[availSpots[i]] = currentPlayer;

      /*collect the score resulted from calling minimax
        on the opponent of the current player*/
      if (currentPlayer === playerTwo){
        const result = this.minimax(virtualBoard, playerOne, ++futureSight);
        move.score = result.score;
      } else {
        const result = this.minimax(virtualBoard, playerTwo, ++futureSight);
        move.score = result.score;
      }

      // reset the spot to empty
      virtualBoard[availSpots[i]] = move.index;
      // push the object to the array
      moves.push(move);
    }

    let bestMove;
    if (currentPlayer === playerTwo) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
    // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
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
        <Text style={{ fontSize: 34, color: '#0a0a0a'}}>
          {turn}
        </Text><TouchableHighlight
          activeOpacity={1}
          style={{
            backgroundColor: '#6e19a2', marginVertical: 50, paddingHorizontal: 20
          }}
          underlayColor='#8352a0'
          onPress={
            () => console.log(this.minimax(current.cells, this.state.currentPlayer))
          }
        >
          <Text style={{ fontSize: 34, color: 'white' }}>Test </Text>
        </TouchableHighlight>
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
