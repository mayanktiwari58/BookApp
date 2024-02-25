import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import { useMyBooks } from "../context/MyBooksProvider";
import BookItem from "../components/BookItem";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTab1 from "./TopTab1";
import TopTab2 from "./TopTab2";
import TopTab3 from "./TopTab3";



const Tab = createMaterialTopTabNavigator();


const TabTwoScreen = () => {
  const { savedBooks } = useMyBooks();
  return (
    <Tab.Navigator>
    <Tab.Screen name="topTab1" component={TopTab1} />
    <Tab.Screen name="topTab2" component={TopTab2} />
    <Tab.Screen name="topTab3" component={TopTab3} />
  </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default TabTwoScreen;
