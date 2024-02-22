import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TabTwoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TabTwoScreen</Text>
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

export default TabTwoScreen

