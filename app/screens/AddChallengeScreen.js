import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '../utils/useAuth';
import SERVER_URL from '../server_url'
import axios from 'axios';


const AddChallengeScreen = () => {
    const { detailedUserData } = useAuthentication()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('Easy');
    const [moneyOnTheLine, setMoneyOnTheLine] = useState('');
    const [visibility, setVisibility] = useState('');
    const navigation = useNavigation();

    if (!detailedUserData) {
        return <Text>Loading or no data available...</Text>;
    }

    const handleSubmit = async () => {
        try {
            const challengeData = {
                title,
                description,
                participants: [detailedUserData.user_id],
                end_date: endDate,
                visibility,
                money_on_the_line: moneyOnTheLine,
            };

            const response = await axios.post(`${SERVER_URL}/api/add_challenge`, challengeData);

            console.log(response.data.message);

            navigation.goBack();
        } catch (error) {
            console.error('Error adding challenge:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.screenTitle}>Add Challenge</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        multiline
                        onChangeText={setDescription}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Start Date (e.g., YYYY-MM-DD)"
                        value={startDate}
                        onChangeText={setStartDate}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="End Date (e.g., YYYY-MM-DD)"
                        value={endDate}
                        onChangeText={setEndDate}
                        autoCapitalize="none"
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={difficultyLevel}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={(itemValue, itemIndex) =>
                                setDifficultyLevel(itemValue)
                            }>
                            <Picker.Item label="Easy" value="Easy" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="Hard" value="Hard" />
                        </Picker>
                    </View>
                    <View style={styles.pickerContainer}>

                        <Picker
                            selectedValue={visibility}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={(itemValue, itemIndex) =>
                                setVisibility(itemValue)
                            }>
                            <Picker.Item label="Hidden" value="Hidden" />
                            <Picker.Item label="Public" value="Public" />
                        </Picker>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Money On The Line"
                        keyboardType="numeric"
                        value={moneyOnTheLine}
                        onChangeText={setMoneyOnTheLine}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                        <Text style={styles.addButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#172B4D',
        marginBottom: 12,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    pickerContainer: {
        width: '100%',
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        overflow: 'hidden',
    },
    picker: {
        width: '100%',

        backgroundColor: 'transparent',
    },
    pickerItem: {
        height: 120,
        fontSize: 14,
    },
    addButton: {
        backgroundColor: '#172B4D',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
    },
    addButtonText: {
        color: '#F2F4F8',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: '#F2F4F8', // Dark blue background
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 70,
    },
    backButtonText: {
        color: '#172B4D', // Light grey text color
        fontSize: 16,
    },
});

export default AddChallengeScreen;

