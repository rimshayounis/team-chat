import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTeams, createTeam, joinTeam } from '../api/api';

const roles = ['Member', 'Admin', 'Owner'];

export default function TeamScreen() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Member');
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  useEffect(() => {
    loadUserId();
    fetchTeams();
  }, []);

  const loadUserId = async () => {
    const id = await AsyncStorage.getItem('userId');
    if (!id) {
      Alert.alert('Error', 'User not found in storage');
      return;
    }
    setUserId(id);
  };

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch teams');
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      return Alert.alert('Error', 'Team name is required');
    }
    try {
      await createTeam(teamName);
      Alert.alert('Success', 'Team created');
      setTeamName('');
      fetchTeams();
    } catch (err) {
      Alert.alert('Error', 'Could not create team');
    }
  };

  const handleJoinTeam = async () => {
    try {
      await joinTeam({ userId, teamId: selectedTeamId, role: selectedRole });
      Alert.alert('Joined', `You joined the team as ${selectedRole}`);
      setRoleModalVisible(false);
    } catch (err) {
      Alert.alert('Error', 'Could not join team');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Teams</Text>

      <FlatList
        data={teams}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.teamItem}>
            <Text style={styles.teamName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => {
                setSelectedTeamId(item._id);
                setRoleModalVisible(true);
              }}
            >
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No teams available</Text>}
      />

      <Text style={styles.subheading}>Create a New Team</Text>

      <TextInput
        value={teamName}
        onChangeText={setTeamName}
        placeholder="Enter team name"
        style={styles.input}
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
        <Text style={styles.buttonText}>Create Team</Text>
      </TouchableOpacity>

      {/* Role Selection Modal */}
      <Modal visible={roleModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subheading}>Select Role</Text>
            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                onPress={() => setSelectedRole(role)}
                style={[
                  styles.roleOption,
                  selectedRole === role && styles.selectedRole,
                ]}
              >
                <Text>{role}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.confirmButton} onPress={handleJoinTeam}>
              <Text style={styles.buttonText}>Join as {selectedRole}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRoleModalVisible(false)}>
              <Text style={{ marginTop: 10, color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f2f5' },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  subheading: { fontSize: 18, fontWeight: '600', marginTop: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
  },
  createButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  teamItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: { fontSize: 16 },
  joinButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  joinButtonText: { color: '#fff', fontWeight: '600' },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  roleOption: {
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedRole: {
    backgroundColor: '#cde4fe',
    borderColor: '#007bff',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
  },
});
