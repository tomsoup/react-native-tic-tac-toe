import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { CELL_SIZE } from '../data/Size';

export const Cell = ({ cell, position, onCellPress }) => {
    return (
      <View>
        <TouchableHighlight
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
              console.log(position);
              onCellPress(position)
            }
          }
        >
          <Text>
            {cell}
          </Text>
        </TouchableHighlight>
      </View>
    )
}
