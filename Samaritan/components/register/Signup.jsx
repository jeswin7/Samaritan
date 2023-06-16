import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';

const SignUp = () => {
  const [userType, setUserType] = useState('seeker');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (userType === 'seeker') {
      // Perform sign up logic for seeker
      console.log('Sign up as seeker:', {
        firstName,
        lastName,
        contactNumber,
        address,
        location,
        email,
        password,
      });
    } else {
      // Perform sign up logic for mentor
      console.log('Sign up as mentor:', {
        firstName,
        lastName,
        contactNumber,
        address,
        email,
        password,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: userType === 'seeker' ? 'lightblue' : 'white',
            paddingVertical: 10,
            alignItems: 'center',
          }}
          onPress={() => setUserType('seeker')}
        >
          <Text>Seeker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: userType === 'mentor' ? 'lightblue' : 'white',
            paddingVertical: 10,
            alignItems: 'center',
          }}
          onPress={() => setUserType('mentor')}
        >
          <Text>Mentor</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
        />
        {userType === 'seeker' && (
          <TextInput
            placeholder="Address (Country)"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        )}
        {userType === 'seeker' && (
          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
        )}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Button title="Sign Up" onPress={handleSignUp} />

      </View>
    </View>
  );
};

export default SignUp;
