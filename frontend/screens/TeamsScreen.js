import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, TextInput } from 'react-native';
import { api } from '../api';

export default function TeamsScreen({ route, navigation }) {
  const { user } = route.params;
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');

  const fetch = async () => {
    const res = await api.get('/teams');
    setTeams(res.data);
  };

  const create = async () => {
    await api.post('/teams', { name });
    setName('');
    fetch();
  };

  useEffect(fetch, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="New Team Name" value={name} onChangeText={setName} />
      <Button title="Create Team" onPress={create} />
      <FlatList
        data={teams}
        keyExtractor={(t) => t._id}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }} onPress={() => navigation.navigate('Channels', { user, team: item })}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}
