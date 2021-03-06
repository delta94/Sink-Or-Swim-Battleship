import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import PropTypes from "prop-types";

Square.propTypes = {
  position: PropTypes.array,
  gridVal: PropTypes.object,
  onPress: PropTypes.func,
};

export default function Square({ position, gridVal, onPress }) {
  // onPress needs to pass position and handle the check

  const isOccupied = gridVal.isEmpty ? false : true;
  const isSelected = gridVal.isSelected ? true : false;

  let value = "";
  if (isSelected && isOccupied) {
    value = <Text>X</Text>;
  } else if (isSelected && !isOccupied) {
    value = <Text>O</Text>;
  }
  return (
    <TouchableNativeFeedback
      onPress={() => {
        onPress(position);
      }}
    >
      <View style={styles.square}>
        <Text>{value}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 40,
    height: 40,
    borderWidth: 1,
  },
  hit: {
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: "center",
  },
  miss: {
    width: 40,
    height: 40,
    fontSize: 25,
    textAlign: "center",
  },
});
