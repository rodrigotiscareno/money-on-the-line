import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChallengeCard from '../components/ChallengeCard';
import SERVER_URL from '../server_url';
import { useAuthentication } from '../utils/useAuth';

export default function ChallengesScreen() {
    const { detailedUserData } = useAuthentication();
    const navigation = useNavigation();

    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        if (detailedUserData && detailedUserData.user_id) {

            fetch(`${SERVER_URL}/api/challenges/participant/${detailedUserData.user_id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setChallenges(data);
                })
                .catch((error) => {
                    console.error('Error fetching challenges:', error);
                });
        }
    }, [detailedUserData]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Challenges</Text>
            <Text style={styles.subtitle}>Check-in! Money's on the Line!</Text>
            {challenges.map((challenge) => (
                <ChallengeCard
                    onPress={() => navigation.navigate('ChallengeDetail')}
                    title={challenge.title}
                    description={challenge.description}
                    content="Money's on the line!"
                    footer={challenge.end_date}
                    moneyValue={challenge.money_on_the_line}
                />
            ))}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddChallenge')}
            >
                <Text style={styles.addButtonText}>Add Challenge</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7E2E9', // Light Blue background
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#172B4D', // Dark Blue color for the text
        marginTop: 80, // Lower the title from the top
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#172B4D',
        marginBottom: 20,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#172B4D', // Dark blue background
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    addButtonText: {
        color: '#F2F4F8', // Light grey text color
        fontSize: 16,
    },
});
