import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ExploreScreen from "./screens/ExploreScreen";
import FriendsStackNavigator from "./FriendsStackNavigator";
import ProfileScreen from "./screens/ProfileScreen";
import ChallengeStackNavigator from "./ChallengeStackNavigator";

const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Challenges") {
              iconName = focused ? "account-group" : "account-group-outline";
            } else if (route.name === "Explore") {
              iconName = focused ? "compass" : "compass-outline";
            } else if (route.name === "Friends") {
              iconName = focused
                ? "account-multiple"
                : "account-multiple-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "account-circle" : "account-circle-outline";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Challenges" component={ChallengeStackNavigator} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Friends" component={FriendsStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
