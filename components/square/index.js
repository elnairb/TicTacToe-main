import React, {useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Square = (props) => {

    return (
      <TouchableOpacity style = {styles.cell} onPress={props.chosenSquare}>
        <Text style = {styles.text}>{props.value}</Text>
          <View style={styles.row}>
            {props.StyleSheet}
          </View>
    </TouchableOpacity>
    
    )

}


const styles = StyleSheet.create({
    row: {
      flexDirection: "row",

      },

    cell: {
      width:100,
      height: 100,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
      text: {
        fontSize: 24,
        color: "#FFFFFF",
        position: "absolute",
        textTransform: 'uppercase',
      },
    });


export default Square;