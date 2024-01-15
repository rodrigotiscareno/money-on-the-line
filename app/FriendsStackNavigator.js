import { createStackNavigator } from '@react-navigation/stack';
import FriendsScreenLeaderboard from './screens/FriendsScreenLeaderboard';
import FriendsScreen from './screens/FriendsScreen';
const ChallengeStack = createStackNavigator();

export default function FriendsStackNavigator() {
    return (
        <ChallengeStack.Navigator screenOptions={{ headerShown: false }}>
            <ChallengeStack.Screen
                name="Friends"
                component={FriendsScreen}
            />
            <ChallengeStack.Screen
                name="Leaderboard"
                component={FriendsScreenLeaderboard}
            />

        </ChallengeStack.Navigator>
    );
}
