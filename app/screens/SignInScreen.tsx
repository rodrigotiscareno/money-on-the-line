import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <Input
          placeholder="Email"
          containerStyle={styles.control}
          inputStyle={styles.inputStyle}
          value={value.email}
          autoCapitalize="none"
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon name="envelope" size={20} color="#F2F4F8" />} // Match the text color of the landing page
        />

        <Input
          placeholder="Password"
          containerStyle={styles.control}
          inputStyle={styles.inputStyle}
          value={value.password}
          autoCapitalize="none"
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={20} color="#F2F4F8" />} // Match the text color of the landing page
        />

        <Button
          title="Sign in"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText} // Apply the text color for consistency
          onPress={signIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0, // Remove the top padding to match the landing page
    backgroundColor: "#172B4D", // Match the background color of the landing page
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#F2F4F8", // Match the text color of the landing page
  },
  controls: {
    width: "100%",
  },
  control: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputStyle: {
    borderColor: "#E0D1FF", // Match the button color of the landing page for consistency
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#F2F4F8", // Match the text color of the landing page
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "#E0D1FF",
    borderRadius: 10,
    paddingVertical: 15,
  },
  buttonText: {
    color: "#3C3C3C", // Match the text color of the landing page
  },
  error: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFCCCC",
    color: "#CC0000",
    textAlign: "center",
  },
});

export default SignInScreen;
