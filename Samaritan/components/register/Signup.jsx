import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { COLORS } from '../../constants';

const SignUp = (props) => {
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


          // POST API
    fetch('http://10.211.55.3:3001/addseeker', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userType,
            firstName,
            lastName,
            contactNumber,
            address,
            location,
            email,
            password,
        })
      })
      .then(()=>setMessage("Seeker registered!!!!"));
    
      


    } else {
      // Perform sign up logic for mentor
      console.log('Sign up as mentor:', {
        userType,
        firstName,
        lastName,
        contactNumber,
        email
      });



          // POST API
    fetch('http://10.211.55.3:3001/addmentor', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            contactNumber,
            email
        })
      })
      .then(()=>setMessage("Mentor registered!!!!"));
          
    }
        props.registered();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: userType === 'seeker' ? COLORS.primary : 'white',
            paddingVertical: 10,
            alignItems: 'center',
          }}
          onPress={() => setUserType('seeker')}
        >
          <Text style={{color: userType === 'seeker' ? COLORS.white : COLORS.primary }}>Seeker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: userType === 'mentor' ? COLORS.primary : COLORS.white,
            paddingVertical: 10,
            alignItems: 'center',
          }}
          onPress={() => setUserType('mentor')}
        >
          <Text style={{color: userType === 'mentor' ? COLORS.white : COLORS.primary }}>Mentor</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
          style={{ paddingVertical: 10 }}
        />
        {userType === 'seeker' && (
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={{ paddingVertical: 10 }}
          />
        )}
        {userType === 'seeker' && (
          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={{ paddingVertical: 10 }}
          />
        )}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ paddingVertical: 10 }}
        />
                {userType === 'seeker' && <>
                <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={{ paddingVertical: 10 }}
        />
                </>}


        <TouchableOpacity onPress={handleSignUp} style={{
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
  }}>Sign Up</Text>
  </TouchableOpacity>

      </View>
    </View>
  );
};

export default SignUp;
