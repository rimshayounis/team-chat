import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { registerUser } from '../api/api';

export default function RegisterScreen({ navigation }) {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    validateForm();
    evaluatePasswordStrength(password);
  }, [username, email, password]);

  const evaluatePasswordStrength = (password) => {
    if (!password) return setPasswordStrength('');
    if (password.length < 6) return setPasswordStrength('Weak');
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) {
      return setPasswordStrength('Strong');
    }
    return setPasswordStrength('Medium');
  };

  const validateForm = () => {
    let newErrors = { username: '', email: '', password: '' };
    let valid = true;

    if (!username.trim()) {
      newErrors.username = 'Name is required';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 7) {
      newErrors.password = 'Password must be at least 7 characters';
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);
  };

  const handleRegister = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fix the errors before submitting.');
      return;
    }

    try {
      await registerUser({ username, email, password });
      Alert.alert('Success', 'Account created!');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Registration Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.card}>
        <TextInput
          value={username}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
        {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <View style={styles.passwordRow}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={[styles.input, { flex: 1, marginRight: 10 }]}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggle}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
        {passwordStrength ? (
          <Text style={[styles.strength, {
            color:
              passwordStrength === 'Weak' ? 'red' :
              passwordStrength === 'Medium' ? '#e67e22' : 'green'
          }]}>
            Password Strength: {passwordStrength}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9eef2',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
  strength: {
    fontSize: 13,
    marginLeft: 5,
    marginBottom: 15,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    color: '#007bff',
    fontWeight: '600',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#a4d8a7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  link: {
    color: '#007bff',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
});
