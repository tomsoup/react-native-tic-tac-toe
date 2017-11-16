import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Cell } from './Cell';
import { BOARD, BOARD_BORDER } from '../data/Size';


export default class Board extends Component {

  renderCell = () => {

    return this.props.cells.map((cell, position) =>
       <Cell cell={cell} key={position} position={position} onCellPress={() => this.props.onCellPress(position)}/>
    );
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
