import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import BasicSettings from "./src/screens/BasicSettings";
import AdvancedSettings from "./src/screens/AdvancedSettings";
import CreateSchedule from "./src/screens/CreateSchedule";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#282c34",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BasicSettings" component={BasicSettings} options={{ title: "Irrigation Settings"}} />
        <Stack.Screen name="AdvancedSettings" component={AdvancedSettings} options={{title: "Advanced Settings"}} />
        <Stack.Screen name="CreateSchedule" component={CreateSchedule} options={{title: "Your Schedule"}} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
