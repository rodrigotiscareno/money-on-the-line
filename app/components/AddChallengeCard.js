import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, SafeAreaView, ScrollView } from 'react-native';

const AddChallengeScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [prize, setPrize] = useState('');

    const handleSubmit = () => {
        // Handle the form submission logic here
        console.log({ title, description, startDate, endDate, difficultyLevel, prize });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
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
                    <TextInput
                        style={styles.input}
                        placeholder="Difficulty Level"
                        value={difficultyLevel}
                        onChangeText={setDifficultyLevel}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Prize"
                        keyboardType="numeric"
                        value={prize}
                        onChangeText={setPrize}
                        autoCapitalize="none"
                    />
                    <Button title="Submit" onPress={handleSubmit} />
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
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#172B4D',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#4A4A4A',
        textAlign: 'center',
        marginBottom: 20,
    },
    detail: {
        fontSize: 14,
        color: '#172B4D',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
});

export default AddChallengeScreen;