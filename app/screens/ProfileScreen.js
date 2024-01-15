import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuthentication } from "../utils/useAuth";

const formatDate = (dateString) => {
  return dateString ? new Date(dateString).toDateString() : 'N/A';
};

const ProfileScreen = () => {
  const { detailedUserData } = useAuthentication();

  if (!detailedUserData) {
    return <Text>Loading or no data available...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.controls}>
        <Input
          label="Full Name"
          value={detailedUserData.full_name || 'N/A'}
          editable={false}
          inputStyle={styles.inputStyle}
          leftIcon={<Icon name="user" size={20} color="#F2F4F8" />}
          autoCapitalize="none"
        />

        <Input
          label="Email"
          value={detailedUserData?.email}
          editable={false}
          inputStyle={styles.inputStyle}
          leftIcon={<Icon name="envelope" size={20} color="#F2F4F8" />}
          autoCapitalize="none"
        />

        <Input
          label="Username"
          value={detailedUserData.username}
          editable={false}
          inputStyle={styles.inputStyle}
          leftIcon={<Icon name="user" size={20} color="#F2F4F8" />}
          autoCapitalize="none"
        />

        <Input
          label="Date of Birth"
          value={new Date(detailedUserData.date_of_birth).toDateString()}
          editable={false}
          inputStyle={styles.inputStyle}
          leftIcon={<Icon name="calendar" size={20} color="#F2F4F8" />}
          autoCapitalize="none"
        />

        <Input
          label="Registration Date"
          value={new Date(detailedUserData.registration_date).toDateString()}
          editable={false}
          inputStyle={styles.inputStyle}
          leftIcon={<Icon name="calendar" size={20} color="#F2F4F8" />}
          autoCapitalize="none"
        />

        <Input
          label="Bio"
          value={detailedUserData.bio}
          editable={false}
          inputStyle={styles.inputStyle}
          leftIcon={<Icon name="align-left" size={20} color="#F2F4F8" />}
          autoCapitalize="none"
        />
      </View>

      <Button title="Sign Out"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonText}
        onPress={() => { }} />
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
  inputStyle: {
    borderColor: "#E0D1FF",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#F2F4F8",
    height: 40,
  },
  buttonText: {
    color: "#3C3C3C",
  },
  buttonStyle: {
    backgroundColor: "#E0D1FF",
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 10,
    color: '#3C3C3C'
  },
});

export default ProfileScreen;
