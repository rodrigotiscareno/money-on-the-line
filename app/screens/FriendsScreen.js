import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import SERVER_URL from '../server_url';
import { useAuthentication } from '../utils/useAuth';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';


const FriendsScreen = () => {
    const { detailedUserData } = useAuthentication();
    const navigation = useNavigation();
    const [friends, setFriends] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchFriends();
        fetchAllUsers();
    }, [detailedUserData]);

    useEffect(() => {
        if (detailedUserData && detailedUserData.user_id) {
            const fetchFriends = async () => {
                try {
                    const response = await fetch(`${SERVER_URL}/api/get_user_friends?user_id=${detailedUserData.user_id}`);
                    const data = await response.json();
                    if (data.friends) {
                        setFriends(data.friends);
                    }
                } catch (error) {
                    console.error("Error fetching friends:", error);
                }
            };

            fetchFriends();
        }
    }, [detailedUserData]);

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/api/get_all_users`);
            const data = await response.json();
            setAllUsers(data);
        } catch (error) {
            console.error("Error fetching all users:", error);
        }
    };

    const fetchFriends = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/api/get_user_friends?user_id=${detailedUserData.user_id}`);
            const data = await response.json();
            if (data.friends) {
                setFriends(data.friends);
            }
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };

    const handleAddFriend = async () => {
        if (!selectedUserId) {
            // Handle case where no user is selected
            return;
        }
        try {
            const response = await fetch(`${SERVER_URL}/api/add_friend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    current_user_id: detailedUserData.user_id,
                    friend_user_id: selectedUserId
                })
            });
            const result = await response.json();
            if (response.ok) {
                fetchFriends();
            } else {
                console.error("Error adding friend:", result.error);
            }
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    if (!detailedUserData) {
        return <Text>Loading or no data available...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>My Friends</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedUserId}
                    onValueChange={(itemValue, itemIndex) => setSelectedUserId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a user..." value={null} />
                    {allUsers.map((user, index) => (
                        <Picker.Item key={index} label={user.full_name} value={user.user_id} />
                    ))}
                </Picker>
                <Button title="Add Friend" onPress={handleAddFriend} />
                <TouchableOpacity
                    style={styles.leaderboardButton}
                    onPress={() => navigation.navigate('Leaderboard')}
                >
                    <Text style={styles.leaderboardText}>Leaderboard</Text>
                </TouchableOpacity>
            </View>
            {friends.map((friend, index) => (
                <Card key={index} containerStyle={styles.cardContainer}>
                    <View style={styles.cardContent}>
                        <Icon name="user-circle-o" type="font-awesome" size={24} color="#517fa4" />
                        <Text style={styles.friendName}>{friend.full_name}</Text>
                    </View>
                </Card>

            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 30, // Added padding at the top of the container
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50, // Increased top margin for the title
        marginLeft: 10,
        color: '#333',
    },
    cardContainer: {
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 10, // Added space between cards
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    friendName: {
        fontSize: 18,
        marginLeft: 10,
    },
    pickerContainer: {
        margin: 20,
    },
    picker: {
        marginBottom: 10,
    },
    leaderboardButton: {
        backgroundColor: '#172B4D', // Dark blue background
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    leaderboardText: {
        color: '#F2F4F8', // Light grey text color
        fontSize: 16,
    },
});

export default FriendsScreen;