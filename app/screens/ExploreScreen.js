import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import SERVER_URL from '../server_url'

const ExploreScreen = () => {
    const [challenges, setChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/api/get_explore_challenges`);
                setChallenges(response.data.challenges);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {challenges.map((challenge, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.title}>{challenge.challenge_title}</Text>
                    {challenge.milestones.map((milestone, idx) => (
                        <View key={idx} style={styles.milestone}>
                            <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                            <Text style={styles.description}>{milestone.description}</Text>
                            <Text style={styles.deadline}>{milestone.deadline}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    container: {
        flex: 1,
        padding: 10,
        marginTop: 70,  // Added top spacing
        marginBottom: 70, // Added bottom spacing
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    milestone: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        paddingTop: 10,
        marginTop: 10,
    },
    milestoneTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    deadline: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    }
});

export default ExploreScreen;
