




import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegistrationScreen';
import TeamScreen from './src/screens/TeamScreen';
import ChannelScreen from './src/screens/ChannelScreen'; // ✅ Newly added

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Team" component={TeamScreen} />
        <Stack.Screen
          name="Channels"
          component={ChannelScreen}
          options={({ route }) => ({
            title: `Channels for ${route.params?.teamName || 'Team'}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



