import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ Add this
import { loginUser } from '../api/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      // ✅ Store userId in AsyncStorage
      await AsyncStorage.setItem('userId', res.user._id);

      Alert.alert('Success', 'Logged in!');
      navigation.navigate('Team'); // Go to team screen
    } catch (err) {
      Alert.alert('Login Failed', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#eef2f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10,
    borderColor: '#ccc', borderWidth: 1,
  },
  button: {
    backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: { textAlign: 'center', color: '#007bff', marginTop: 10 },
});
