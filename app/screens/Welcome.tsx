import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { useFonts } from "@expo-google-fonts/roboto";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    RobotoBlack: require("../assets/Roboto/Roboto-Black.ttf"),
    RobotoRegular: require("../assets/Roboto/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // #TODO Replace with loading screen once we have it
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Money on the Line</Text>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logoCircle}
          source={require("../assets/draft_logo.png")}
        />
      </View>

      <Text style={styles.subtitle}>Put your money where your mouth is</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Button
            onPress={() => navigation.navigate("Sign In")}
            title="Sign in"
            buttonStyle={[styles.button, styles.fixedWidth]}
            titleStyle={styles.buttonText}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Button
            title="Sign up"
            buttonStyle={[styles.button, styles.fixedWidth]}
            titleStyle={styles.buttonText}
            onPress={() => navigation.navigate("Sign Up")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#172B4D",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F2F4F8",
    fontFamily: "RobotoBlack",
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 250, // Set the width
    height: 250, // Set the height
    borderRadius: 50, // Makes it circular
  },
  subtitle: {
    fontSize: 18,
    color: "#F2F4F8",
    fontFamily: "RobotoRegular",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "RobotoRegular",
    fontSize: 26,
    color: "#3C3C3C",
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#E0D1FF",
    padding: 25,
    borderRadius: 10, // Add rounded corners
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  fixedWidth: {
    width: 200, // Set a fixed width for the buttons
  },
});

export default WelcomeScreen;
