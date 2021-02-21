import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default function ButtonUniv({ params, color, title, action, isDisabled }) {
  return (
    <TouchableHighlight
      onPress={() => action(params)}
      disabled={isDisabled}
      style={[{ backgroundColor: color }, styles.btnOut]}
    >
      <View style={styles.btn}>
        <Text style={styles.btn}>{title}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  btn: {
    textAlign: 'center',
    color: 'white',
    paddingVertical: 4
  },
  btnOut: {
    color: 'white',
    width: 110,
    borderColor: 'black',
    marginHorizontal: 5,
  }
})
