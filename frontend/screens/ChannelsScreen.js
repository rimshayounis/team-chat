import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, TextInput } from 'react-native';
import { api } from '../api';

export default function ChannelsScreen({ route, navigation }) {
  const { user, team } = route.params;
  const [channels, setChannels] = useState([]);
  const [name, setName] = useState('');

  const fetch = async () => {
    const res = await api.get(`/channels/${team._id}`);
    setChannels(res.data);
  };

  const create = async () => {
    await api.post('/channels', { teamId: team._id, name });
    setName('');
    fetch();
  };

  useEffect(fetch, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="New Channel Name" value={name} onChangeText={setName} />
      <Button title="Create Channel" onPress={create} />
      <FlatList
        data={channels}
        keyExtractor={(c) => c._id}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }} onPress={() => navigation.replace('Chat', { user, channel: item })}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}
