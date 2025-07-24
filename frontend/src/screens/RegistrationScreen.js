import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { registerUser } from '../api/api';

export default function RegisterScreen({ navigation }) {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser({ username, email, password });
      Alert.alert('Success', 'Account created!');
      navigation.navigate('Login'); // Go to login
    } catch (err) {
      Alert.alert('Registration Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        value={username}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
    backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: { textAlign: 'center', color: '#007bff', marginTop: 10 },
});
