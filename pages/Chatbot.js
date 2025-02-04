
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const fadeAnim = new Animated.Value(1);


  const predefinedResponses = [
    { keyword: "sad", response: "I'm sorry you're feeling sad. It's okay to feel this way. Do you want to talk more about it?" },
    { keyword: "anxious", response: "Anxiety can be tough to manage. Try taking deep breaths and grounding yourself. I'm here for you." },
    { keyword: "help", response: "I'm here to listen. Sometimes, sharing your thoughts can lighten the load. What's on your mind?" },
    { keyword: "happy", response: "That's wonderful to hear! Keep spreading the positivity!" },
    { keyword: "stressed", response: "Stress can be overwhelming. Have you tried doing something that relaxes you?" },
    { keyword: "lonely", response: "Feeling lonely can be hard. Remember, you're not alone. I’m here to chat anytime." },
    { keyword: "angry", response: "Anger can be intense. Taking a few deep breaths may help you feel more grounded." },
    { keyword: "overwhelmed", response: "It's understandable to feel overwhelmed. Taking things one step at a time can help." },
    { keyword: "tired", response: "If you're feeling tired, remember to give yourself time to rest and recharge." },
    { keyword: "sleep", response: "Good sleep can really help our mental health. Is there anything on your mind keeping you up?" },
    { keyword: "hopeful", response: "Feeling hopeful is such a wonderful emotion! Keep holding on to it." },
    { keyword: "unmotivated", response: "Motivation comes and goes. Doing a small activity you enjoy might help you get started." },
    { keyword: "nervous", response: "Nerves are normal. Try focusing on your breathing to ease your mind." },
    { keyword: "depressed", response: "I'm here for you. Depression can feel heavy, but talking about it might help lighten the load." },
    { keyword: "excited", response: "Excitement is contagious! What’s making you feel this way?" },
    { keyword: "lost", response: "Feeling lost can be unsettling. Reflecting on what you value most may help guide you forward." },
    { keyword: "worried", response: "Worry can weigh us down. Try to focus on things within your control right now." },
    { keyword: "heartbroken", response: "Heartbreak is painful. Allow yourself time to grieve and heal." },
    { keyword: "confused", response: "Confusion is a normal part of growth. It's okay to ask questions and seek answers." },
    { keyword: "grateful", response: "Gratitude is a wonderful feeling. Is there something specific you're grateful for today?" },
    { keyword: "bored", response: "Boredom can feel uncomfortable. Is there something creative or relaxing you’d like to try?" },
    { keyword: "curious", response: "Curiosity is a great sign of growth. What’s on your mind?" },
    { keyword: "reflect", response: "Reflection can bring clarity. Sometimes writing your thoughts can help organize them." },
    { keyword: "confident", response: "Confidence looks great on you! Embrace this feeling and let it carry you forward." },
    { keyword: "ashamed", response: "Shame can be a heavy emotion. Remember, we all make mistakes and grow from them." },
    { keyword: "disappointed", response: "Disappointment is tough, but it shows you care deeply. That’s a strength." },
    { keyword: "proud", response: "It’s wonderful to feel proud! Celebrate your achievements, big or small." },
    { keyword: "fearful", response: "Fear can feel intense. Try grounding yourself in the present moment." },
    { keyword: "content", response: "Contentment is a peaceful state. Enjoy this moment." },
    { keyword: "resentful", response: "Resentment can build up. Reflecting on what’s causing it may bring you peace." },
    { keyword: "relaxed", response: "Relaxation is great for your mind and body. Enjoy this calm moment." },
    { keyword: "frustrated", response: "Frustration happens when things don’t go as planned. Taking a break can sometimes help reset." },
    { keyword: "insecure", response: "Insecurity is common. Try to focus on things that make you feel strong and capable." },
    { keyword: "jealous", response: "Jealousy can be challenging. Reflect on your own strengths and what makes you unique." },
    { keyword: "hurt", response: "I'm sorry you're feeling hurt. Letting it out can sometimes help in the healing process." },
    { keyword: "optimistic", response: "Optimism is a powerful tool. Keep seeing the bright side!" },
    { keyword: "regret", response: "Regret can teach us important lessons. It's part of growth and moving forward." },
    { keyword: "shy", response: "Shyness is perfectly okay. Taking small steps can help build confidence over time." },
    { keyword: "joyful", response: "Joy is infectious! What’s bringing you happiness today?" },
    { keyword: "calm", response: "Staying calm is a strength. Embrace this peaceful state." },
    { keyword: "hope", response: "Hope is a beautiful thing. Hold onto it, especially in tough times." },
    { keyword: "anger", response: "Anger is a natural emotion. Finding a healthy outlet can help process it." },
    { keyword: "grief", response: "Grief is hard. Take all the time you need to feel and heal." },
    { keyword: "remorse", response: "Remorse can help us grow. Be kind to yourself as you learn from this." },
    { keyword: "appreciation", response: "Appreciation is a wonderful thing to express. It can brighten someone's day." },
    { keyword: "patience", response: "Patience is a gift you give yourself. It helps in seeing things through." },
    { keyword: "faith", response: "Faith can be a guiding light. Lean into what brings you comfort." },
    { keyword: "courage", response: "Courage means doing something despite fear. You’re stronger than you know." },
    { keyword: "peace", response: "Finding peace within is powerful. Keep nurturing this feeling." },
    { keyword: "acceptance", response: "Acceptance brings a sense of freedom. Embrace who you are." },
    { keyword: "trust", response: "Trust is important. Take time to build it and be kind to yourself in the process." },
    { keyword: "love", response: "Love is beautiful. It can make life brighter." },
    { keyword: "kindness", response: "Kindness has a ripple effect. It can change someone’s day for the better." },
    { keyword: "sorrow", response: "Sorrow can feel overwhelming. Letting it out can sometimes help in healing." },
    { keyword: "determined", response: "Determination is a strong quality. Keep pushing forward toward your goals." },
    { keyword: "relieved", response: "Relief can feel so freeing. Take a deep breath and enjoy this moment." },
    { keyword: "thankful", response: "Thankfulness can shift perspectives. Is there someone or something you’re thankful for?" },
    { keyword: "disgusted", response: "Disgust is a strong reaction. Reflecting on its source can sometimes bring clarity." },
    { keyword: "afraid", response: "Fear is natural. Being aware of it can help in managing it." },
    { keyword: "forgiveness", response: "Forgiveness is powerful. It can lighten your spirit and bring peace." },
    { keyword: "guilt", response: "Guilt can weigh heavily. Reflecting on it and learning from it can bring relief." },
    { keyword: "honesty", response: "Honesty with yourself and others can bring clarity and build trust." },
    { keyword: "confidence", response: "Confidence is a gift. Embrace it and let it guide you forward." },
    { keyword: "mood", response: "How's your mood today? Sometimes sharing can help." },
    { keyword: "perspective", response: "A shift in perspective can change so much. What are you reflecting on?" },
    { keyword: "encouraged", response: "Feeling encouraged is wonderful! Hold onto this motivation." },
    { keyword: "gratitude", response: "Practicing gratitude can bring so much peace. Is there something you’re grateful for today?" },
    { keyword: "genuine", response: "Being genuine is a gift to yourself and others. Stay true to who you are." },
    // Add more keyword-based responses if needed
];


  const getBotResponse = (message) => {
    const match = predefinedResponses.find((response) => message.includes(response.keyword));
    return match ? match.response : "I'm here for you. Feel free to share anything on your mind.";
  };

  const sendMessage = () => {
    if (input.trim() === '') return;

    // Add user message to the chat
    setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);

    // Get bot's response
    const botResponse = getBotResponse(input.toLowerCase());

    // Add bot message to the chat
    setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);

    // Clear input field
    setInput('');

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
              {item.text}
            </Text>
          </Animated.View>
        )}
        style={styles.messageList}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  messageList: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#a1c4fd',
    color: '#fff',
    borderRadius: 15,
    padding: 12,
    marginVertical: 5,
    maxWidth: '75%',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fdd9b5',
    color: '#000',
    borderRadius: 15,
    padding: 12,
    marginVertical: 5,
    maxWidth: '75%',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    padding: 10,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sendButton: {
    backgroundColor: '#34a0a4',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chatbot;
