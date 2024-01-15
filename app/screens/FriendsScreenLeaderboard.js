import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FriendsScreenLeaderboard = () => {
    const navigation = useNavigation();
    const friends = [
        { name: 'Me', points: 130 },
        { name: 'Alice', points: 120 },
        { name: 'Bob', points: 110 },
        { name: 'Charlie', points: 90 },
    ];

    const renderFriendItem = ({ item }) => {
        const isMe = item.name === 'Me';
        return (
            <View style={isMe ? styles.myItem : styles.friendItem}>

                <Text style={isMe ? styles.myName : styles.friendName}>{item.name}</Text>
                <Text style={isMe ? styles.myPoints : styles.friendPoints}>{item.points} Points</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Leaderboard</Text>
            <FlatList
                data={friends}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={renderFriendItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#F0F4F8',
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
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#172B4D',
        marginBottom: 20,
        textAlign: 'center',
    },
    friendItem: {
        backgroundColor: '#E0D1FF',
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    friendName: {
        fontSize: 18,
        color: '#172B4D',
    },
    friendPoints: {
        fontSize: 16,
        color: '#172B4D',
    },
    myItem: {
        backgroundColor: '#172B4D',
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    myName: {
        fontSize: 18,
        color: '#F0F4F8',
    },
    myPoints: {
        fontSize: 16,
        color: '#F0F4F8',
    },
});

export default FriendsScreenLeaderboard;
