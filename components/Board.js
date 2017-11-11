import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Cell } from './Cell';
import { BOARD, BOARD_BORDER } from '../data/Size';


export default class Board extends Component {
  state = { cells: Array(9).fill(null) };

  addMark = (cell) => {
    const cells = this.state.cells.slice();
    cells[i] = 'X';
    this.setState({cells});
  }

  renderCell = () => {
    return this.state.cells.map((cell, index) =>
       <Cell cell={cell} key={index} onCellPress={() => this.addMark(cell)}/>
      )
     }

  render() {
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
