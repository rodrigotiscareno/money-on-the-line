import { createStackNavigator } from '@react-navigation/stack';
import ChallengeScreen from './screens/ChallengeScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import AddChallengeScreen from './screens/AddChallengeScreen';

const ChallengeStack = createStackNavigator();

export default function ChallengeStackNavigator() {
    return (
        <ChallengeStack.Navigator screenOptions={{ headerShown: false }}>
            <ChallengeStack.Screen
                name="ChallengesList"
                component={ChallengesScreen}
            />
            <ChallengeStack.Screen
                name="ChallengeDetail"
                component={ChallengeScreen}
            />
             <ChallengeStack.Screen
                name="AddChallenge"
                component={AddChallengeScreen}
            />
        </ChallengeStack.Navigator>
    );
}
