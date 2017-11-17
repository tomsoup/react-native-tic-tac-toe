import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { CELL_SIZE } from '../data/Size';

export const Cell = ({ cell, position, onCellPress }) => {
    const cellColor = (cell) => {
      switch(cell) {
        case 'O':
          return '#08d6a0';
        default:
          return '#1289b2';
      };
    }

    return (
      <View>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor='#fffdef'
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            flexDirection: 'column',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'black'

          }}
          onPress={
            () => {
              onCellPress(position)
            }
          }
        >
          <Text style={{ color: cellColor(cell), fontSize: 36, fontWeight: '700'}}>
            {cell}
          </Text>
        </TouchableHighlight>
      </View>
    )
}
