import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchChannels } from '../../api';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChannelScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { teamId, teamName } = route.params;

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChannels = async () => {
    try {
      setLoading(true);
      const data = await fetchChannels(teamId);
      setChannels(data);
    } catch (err) {
      console.error('Error loading channels:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  const handleOpenChannel = (channel) => {
    navigation.navigate('MessageScreen', {
      channelId: channel._id,
      channelName: channel.name,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Back to Teams</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>{teamName} - Channels</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={channels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.channelCard}
              onPress={() => handleOpenChannel(item)}
            >
              <Ionicons name="chatbubbles-outline" size={24} color="#007bff" style={styles.icon} />
              <Text style={styles.channelName}>{item.name}</Text>
              <Text style={styles.messageCount}>5 msgs</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    color: '#007bff',
    fontSize: 16,
    marginLeft: 6,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f2937',
  },
  channelCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  channelName: {
    flex: 1,
    fontSize: 18,
    color: '#111827',
  },
  messageCount: {
    fontSize: 14,
    color: '#6b7280',
  },
});
