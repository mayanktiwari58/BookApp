import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabOneScreen from './screens/TabOneScreen';
import TabTwoScreen from './screens/TabTwoScreen';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const API_KEY = "zefyri::stepzen.net+1000::f5ab02b562fbf72e2f7abbb1dd6229be3bc14b4df625d9058db9de6f6cc7c1e2";

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

export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen name="TabOne" component={TabOneScreen }/>
        <Tab.Screen name="TabTwo" component={TabTwoScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  </ApolloProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
