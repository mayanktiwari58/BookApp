import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,Image } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabOneScreen from "./screens/TabOneScreen";
import TabTwoScreen from "./screens/TabTwoScreen";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import MyBooksProvider from "./context/MyBooksProvider";


const API_KEY =
  "zefyri::stepzen.net+1000::f5ab02b562fbf72e2f7abbb1dd6229be3bc14b4df625d9058db9de6f6cc7c1e2";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://zefyri.stepzen.net/api/looming-macaw/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <MyBooksProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Search" component={TabOneScreen} 
             options={{
              tabBarIcon:({focused})=>{
                return(
                  <Image source={require("../../../BookApp/assets/book-search.png")}
                  style={styles.iconStyle}/>
                )
            },
              headerTitleStyle: {
                fontSize: 22,
              },
              headerTitle: "SearchScreen",
              headerTitleAlign: "center",}}/>
            <Tab.Screen name="MyBook" component={TabTwoScreen}
             options={{
              tabBarIcon:({focused})=>{
                return(
                  <Image source={require("../../../BookApp/assets/book.png")}
                  style={styles.iconStyleTwo}/>
                )
            },
              headerTitleStyle: {
                fontSize: 22,
              },
              headerTitle: "MyBooksScreen",
              headerTitleAlign: "center",}} />
          </Tab.Navigator>
        </NavigationContainer>
      </MyBooksProvider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle:{
    width:"100%",
    height:35,
    aspectRatio:1,
    borderRadius:10,
  },
  iconStyleTwo:{
    width:"100%",
    height:30,
    aspectRatio:1,
    borderRadius:10,
  }
});

export default App;
