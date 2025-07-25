import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchTeams, joinTeam, createTeam, deleteTeam } from '../api/api';

const ADMIN_ID = '6881f88f559b4c3e91663c58';

export default function TeamScreen({ navigation }) {
  const [teams, setTeams] = useState([]);
  const [userId, setUserId] = useState(null);
  const [joinedTeamIds, setJoinedTeamIds] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [filter, setFilter] = useState('all'); // all | joined | notJoined

  useEffect(() => {
    const init = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
      const allTeams = await fetchTeams();
      setTeams(allTeams);

      const userTeams = allTeams.filter(team =>
        team.members?.some(m => m.user === storedUserId));
      setJoinedTeamIds(userTeams.map(team => team._id));
    };
    init();
  }, []);

  const handleJoin = async (teamId) => {
    try {
      await joinTeam({ userId, teamId });
      Alert.alert(' Success', 'You joined the team!');
      setJoinedTeamIds([...joinedTeamIds, teamId]);
    } catch (err) {
      Alert.alert('❌ Error', err.message);
    }
  };

  const handleCreate = async () => {
    try {
      const created = await createTeam({ name: newTeamName, userId });
      setTeams([...teams, created]);
      Alert.alert('✅ Success', 'Team Created!');
      setNewTeamName('');
    } catch (err) {
      Alert.alert('❌ Error', err.message);
    }
  };

  const handleDelete = async (teamId) => {
    try {
      await deleteTeam({ teamId, userId });
      setTeams(teams.filter(t => t._id !== teamId));
      Alert.alert('✅ Deleted', 'Team deleted successfully');
    } catch (err) {
      Alert.alert('❌ Error', err.message);
    }
  };

  const isAdmin = userId === ADMIN_ID;

  const getFilteredTeams = () => {
    if (filter === 'joined') return teams.filter(t => joinedTeamIds.includes(t._id));
    if (filter === 'notJoined') return teams.filter(t => !joinedTeamIds.includes(t._id));
    return teams;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Teams</Text>

      {isAdmin && (
        <>
          <TextInput
            placeholder="New Team Name"
            value={newTeamName}
            onChangeText={setNewTeamName}
            style={styles.input}
          />
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Create Team</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Filter Buttons */}
      <View style={styles.filters}>
        {['all', 'joined', 'notJoined'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            style={[styles.filterBtn, filter === type && styles.activeFilter]}
          >
            <Text style={styles.filterText}>{type.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredTeams()}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.teamCard}>
            <Text style={styles.teamName}>{item.name}</Text>

            {!joinedTeamIds.includes(item._id) ? (
              <TouchableOpacity style={styles.joinBtn} onPress={() => handleJoin(item._id)}>
                <Text style={styles.joinText}>Join</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.joinedLabel}>Joined</Text>
            )}

            {isAdmin && (
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Text style={styles.deleteText}>🗑️ Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#f0f4f8' },
  heading: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 10,
    backgroundColor: '#fff'
  },
  createButton: {
    backgroundColor: '#28a745', padding: 12,
    borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  createButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  filterBtn: {
    padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#007bff', backgroundColor: '#fff',
  },
  activeFilter: { backgroundColor: '#007bff' },
  filterText: { color: '#007bff', fontWeight: 'bold' },
  teamCard: {
    backgroundColor: '#fff', padding: 15, borderRadius: 10,
    marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  teamName: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  joinBtn: {
    backgroundColor: '#007bff', padding: 10,
    borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  joinText: { color: '#fff', fontWeight: '600' },
  joinedLabel: {
    color: 'green', fontWeight: 'bold', marginTop: 6, textAlign: 'center',
  },
  deleteText: {
    color: '#dc3545', marginTop: 10, textAlign: 'right', fontWeight: '600'
  }
});
