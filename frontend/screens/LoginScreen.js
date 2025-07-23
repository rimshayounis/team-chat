import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { api } from '../api';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    const res = await api.post('/users', { username, email: username + '@test.com', password: 'pass' });
    navigation.replace('Teams', { user: res.data });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <Button title="Login / Sign Up" onPress={handleLogin} />
    </View>
  );
}
