import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Cell } from './Cell';
import { BOARD, BOARD_BORDER } from '../data/Size';


export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      cells: Array(9).fill(null),
      playerOne: true,
    };
  }


  addMark = (position) => {
    //slice to avoid state mutation
    const cells = this.state.cells.slice();
    if (this.calculateWinner(cells) || cells[position]) {
      return;
    }
    // short hand to determine x or o
    cells[position] = this.state.playerOne ? 'X' : 'O';
    this.setState({cells, playerOne: !this.state.playerOne });
  }

  renderCell = () => {

    return this.state.cells.map((cell, index) =>
       <Cell cell={cell} key={index} position={index} onCellPress={() => this.addMark(index)}/>
    );
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


  render() {

    const winner = this.calculateWinner(this.state.cells);

    let status;
      if (winner) {
          console.log(`${winner} Wins!`);
      } else {
          console.log('keep playing');
      }

    return (
      <View style={{
        width: BOARD,
        height: BOARD,
        borderWidth: BOARD_BORDER,
        borderColor: 'black',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        {this.renderCell()}
      </View>
    );
  }
}
