import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, Button, Chip } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import SERVER_URL from "../server_url";

const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    fullName: "",
    dob: new Date(2000, 0, 1),
    regDate: new Date(),
    bio: "",
    interests: [],
    error: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || value.dob;
    setShowDatePicker(Platform.OS === "ios"); // Hide the picker on iOS immediately
    setValue({ ...value, dob: currentDate });
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  async function signUp() {
    if (
      value.email === "" ||
      value.password === "" ||
      value.fullName === "" ||
      value.dob === null ||
      value.regDate === null ||
      value.bio === "" ||
      value.interests.length === 0
    ) {
      setValue({
        ...value,
        error: "All fields are mandatory.",
      });
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      if (response && response.user) {
        const firebaseUserId = response.user.uid;

        const completeUserData = { ...value, user_id: firebaseUserId };
        fetch(`${SERVER_URL}/api/add_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeUserData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("User added:", data);
          });
        navigation.navigate("Sign In");
      }
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  const handleInterestSelect = (interest) => {
    const updatedInterests = [...value.interests];

    if (updatedInterests.includes(interest)) {
      const index = updatedInterests.indexOf(interest);
      updatedInterests.splice(index, 1);
    } else {
      updatedInterests.push(interest);
    }

    setValue({
      ...value,
      interests: updatedInterests,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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
          leftIcon={<Icon name="envelope" size={20} color="#F2F4F8" />}
        />

        <Input
          placeholder="Password"
          containerStyle={styles.control}
          inputStyle={styles.inputStyle}
          value={value.password}
          autoCapitalize="none"
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={20} color="#F2F4F8" />}
        />

        <Input
          placeholder="Full Name"
          containerStyle={styles.control}
          inputStyle={styles.inputStyle}
          value={value.fullName}
          autoCapitalize="none"
          onChangeText={(text) => setValue({ ...value, fullName: text })}
          leftIcon={<Icon name="user" size={20} color="#F2F4F8" />}
        />

        <Input
          placeholder="Bio"
          containerStyle={styles.control}
          inputStyle={styles.inputStyle}
          value={value.bio}
          autoCapitalize="none"
          onChangeText={(text) => setValue({ ...value, bio: text })}
          leftIcon={<Icon name="align-left" size={20} color="#F2F4F8" />}
        />

        <View style={styles.control}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>Date of Birth:</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <View style={styles.datePicker}>
                <Text style={styles.inputStyle}>
                  {value.dob.toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={value.dob}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.interestsContainer}>
          <Text style={styles.label}>Interests:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              "Fitness",
              "Reading",
              "Travel",
              "Coding",
              "Finance",
              "Adventure",
              "Health",
            ].map((interest) => (
              <Chip
                key={interest}
                title={interest}
                type={value.interests.includes(interest) ? "solid" : "outline"}
                onPress={() => handleInterestSelect(interest)}
              />
            ))}
          </ScrollView>
        </View>

        <Button
          title="Sign up"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          onPress={signUp}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#172B4D",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#F2F4F8",
  },
  controls: {
    width: "100%",
  },
  control: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputStyle: {
    borderColor: "#E0D1FF",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#F2F4F8",
    height: 40,
  },
  buttonStyle: {
    backgroundColor: "#E0D1FF",
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#3C3C3C",
  },
  error: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFCCCC",
    color: "#CC0000",
    textAlign: "center",
  },
  interestsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#F2F4F8",
    marginBottom: 5,
    marginRight: 10,
  },
  datePickerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  datePicker: {
    flex: 1,
    marginLeft: 10,
  },
});

export default SignUpScreen;
