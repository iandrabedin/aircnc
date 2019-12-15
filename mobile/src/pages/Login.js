import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import logo from '../assets/logo.png';

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  // If user is logged in, redirect to List Page
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List');
      }
    });
  }, []);

  const handleSubmit = async () => {
    const response = await api.post('/sessions', {email});

    const {_id} = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  };

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      style={styles.container}
      behavior="padding">
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>E-mail *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Technologies</Text>
        <TextInput
          style={styles.input}
          placeholder="Technologies"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Find spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  button: {
    height: 44,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
