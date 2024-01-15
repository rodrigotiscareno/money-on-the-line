import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const MilestoneCard = ({ title, description, points, completed, toggleCompletion }) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerContainer}>
                <Text style={styles.cardHeader}>{title}</Text>
                <TouchableOpacity onPress={toggleCompletion}>
                    {completed ? (
                        <Icon name="check-circle" type="material" size={30} color="#4CAF50" />
                    ) : (
                        <Icon name="radio-button-unchecked" type="material" size={30} color="#757575" />
                    )}
                </TouchableOpacity>
            </View>
            <Text style={styles.cardDescription}>{description}</Text>
            <View style={styles.cardFooter}>
                <Icon name="fire" type="material-community" size={24} color="#FF4500" />
                <Text style={styles.pointsText}>{points} Points</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF', // White background for a clean look
        borderRadius: 10,
        padding: 16,
        margin: 16,
        elevation: 4, // Subtle shadow on Android
        shadowColor: '#000', // Shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#172B4D',
    },
    cardDescription: {
        fontSize: 16,
        color: '#4A4A4A',
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointsText: {
        fontSize: 18,
        color: '#172B4D',
        marginLeft: 8,
    },
    checkboxContainer: {
        alignSelf: 'flex-start',
        marginTop: 10,
        // Any additional styling for the checkbox container if needed
    },
});

export default MilestoneCard;
