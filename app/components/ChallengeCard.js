import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const ChallengeCard = ({ onPress, title, description, content, footer, moneyValue }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
        >
            <Text style={styles.cardHeader}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
            <View style={styles.cardContent}>
                <Icon name="attach-money" size={24} color="#172B4D" />
                <Text>{moneyValue}</Text>
                <Icon name="fire" type="material-community" size={24} color="#FF4500" />
            </View>
            <Text style={styles.cardContentText}>{content}</Text>
            <Text style={styles.cardFooter}>{footer}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#E0D1FF', // Light Purple background for the card
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 10,
        elevation: 3, // Shadow on Android
        shadowColor: '#000', // Shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#172B4D',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 16,
        color: '#172B4D',
        marginBottom: 16,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardContentText: {
        fontSize: 14,
        color: '#172B4D',
        marginBottom: 16,
    },
    cardFooter: {
        fontSize: 14,
        color: '#172B4D',
    },
});

export default ChallengeCard;
