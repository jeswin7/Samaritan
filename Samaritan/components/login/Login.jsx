import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../constants';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');

  const nameRegex = /^[A-Za-z]+$/;
  const numberRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (email !== '' && !emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  }, [email]);


  const postAPI = async () => {


    if (!email || !password) {
      setError('Please fill in all the fields');
      return;
    }

    else if (emailError !== '') {
      setError(emailError);
      return;
    }


    else{
      const url = `http://10.211.55.3:3001/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
    
        const data = await response.json();
        console.log('Response data:', data.status);
    
        // Process the response data
       if(data.status === 200)
        props.isValid();
      else
        alert("Invalid user!!!")
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    }


  }
  

  const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in...', email, password);
    postAPI();
  };

  const handleNewuser = () => {
    props.isNewUser();
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
      <TextInput
        style={{ paddingVertical: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ paddingVertical: 10 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={{
            marginVertical: 50,
            elevation: 8,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}>
    <Text style={{
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }}>Sign In</Text>
  </TouchableOpacity>

  <View style={{ flex: 1 }}>
  {/* Existing JSX code */}
  <View style={{ paddingHorizontal: 20, paddingVertical: 20, alignItems: 'center' }}>
    {/* Existing TextInput fields */}
    {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
    {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text>}
    {contactNumberError !== '' && <Text style={{ color: 'red' }}>{contactNumberError}</Text>}
    {/* Existing TouchableOpacity */}
  </View>
</View>
      <TouchableOpacity onPress={handleNewuser}
      style={{
            flex: 1,
            marginVertical: 40,
            alignItems: 'center',
          }}>
          <Text style={{ color: COLORS.primary }}>New to Samaritan? Sign up now...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;