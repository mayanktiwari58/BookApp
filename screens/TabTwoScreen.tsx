import { StyleSheet} from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SavedScreen from "./savedScreen";
import CurrentScreen from "./currentScreen";
import ReadScreen from "./readScreen";



const Tab = createMaterialTopTabNavigator();

const TabTwoScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Want to Read" component={SavedScreen}/>
      <Tab.Screen name="Currently Reading" component={CurrentScreen} />
      <Tab.Screen name=" Already read" component={ReadScreen} />
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
