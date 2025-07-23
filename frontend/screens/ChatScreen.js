
import React, { useEffect, useState, useRef}  from 'react';
import { view, FlatList, Text, TextInput, Button} from 'react-native';
import io from 'socket.io-client';
import { api } from '../api';
export default function ChatScreen({ route }) {
  const { user, channel } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3000'); 

    socket.current.emit('joinRoom', { channelId: channel._id });
    api.get(`/messages/${channel._id}`).then(res => setMessages(res.data));

    socket.current.on('receiveMessage', msg => setMessages(prev => [...prev, msg]));
    socket.current.on('typing', data => setTypingUsers([data.senderId]));

    return () => socket.current.disconnect();
  }, []);

  const send = () => {
    socket.current.emit('sendMessage', { channelId: channel._id, senderId: user._id, content: text });
    setText('');
  };

  const onTyping = () => {
    socket.current.emit('typing', { channelId: channel._id, senderId: user._id });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {typingUsers.length > 0 && <Text>Someone is typing...</Text>}
      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text>
            <Text style={{ fontWeight: item.sender === user._id ? 'bold' : 'normal' }}>
              {item.sender === user._id ? 'You' : item.sender}:
            </Text> {item.content}
          </Text>
        )}
      />
      <TextInput
        placeholder="Type a message..."
        value={text}
        onChangeText={t => { setText(t); onTyping(); }}
        style={{ borderTopWidth: 1, padding: 10 }}
      />
      <Button title="Send" onPress={send} />
    </View>
  );
}
