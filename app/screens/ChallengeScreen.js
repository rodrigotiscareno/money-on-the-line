import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import MilestoneCard from '../components/MilestoneCard'; // Import MilestoneCard
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Button } from 'react-native-elements';

const challengeExample = {
    challenge_id: 1,
    title: "30-Day Fitness Challenge",
    description: "Commit to 30 days of fitness to win big!",
    participants: 50,
    start_date: new Date(),
    end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
    milestones: [
        { title: "Week 1: Cardio Challenge", description: "Complete 5 cardio sessions", points: 10, completed: false },
        { title: "Week 2: Strength Training", description: "Weight lifting for at least 3 days", points: 15, completed: false },
        // Add more milestones as needed
    ], milestone_frequency: 'Weekly',
    difficulty_level: 'Intermediate',
    money_on_the_line: 100,

};
const ChallengeScreen = () => {
    const navigation = useNavigation(); // Hook to get the navigation prop
    const { title, description, participants, start_date, end_date, difficulty_level, money_on_the_line, milestones } = challengeExample;
    const [isCompleted, setIsCompleted] = React.useState(false);

    const handleToggleCompletion = () => {
        setIsCompleted(!isCompleted);
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.detail}>Participants: {participants}</Text>
                    <Text style={styles.detail}>Start Date: {start_date.toDateString()}</Text>
                    <Text style={styles.detail}>End Date: {end_date.toDateString()}</Text>
                    <Text style={styles.detail}>Difficulty: {difficulty_level}</Text>
                    <Text style={styles.detail}>Prize: ${money_on_the_line}</Text>
                </View>
                {milestones.map((milestone, index) => (
                    <MilestoneCard
                        key={index}
                        title={milestone.title}
                        description={milestone.description}
                        points={milestone.points}
                        completed={milestone.completed}
                        toggleCompletion={handleToggleCompletion}
                    />
                ))}
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
        padding: 10,
        backgroundColor: '#172B4D',
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
        color: '#F2F4F8',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#F2F4F8',
        textAlign: 'center',
        marginBottom: 20,
    },
    detail: {
        fontSize: 14,
        color: '#F2F4F8',
        marginBottom: 8,
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

export default ChallengeScreen;