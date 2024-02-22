import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TabOneScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
})

export default TabOneScreen;

