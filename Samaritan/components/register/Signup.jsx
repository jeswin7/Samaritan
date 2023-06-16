import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
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
  

  const handleSignUp = () => {
    if (userType === 'seeker') {
  // Perform form validations
  if (!firstName || !lastName || !contactNumber || !email || !password || !confirmPassword) {
    setError('Please fill in all the required fields');
    return;
  }

  else if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }


  else if (!nameRegex.test(firstName)) {
    setError('Invalid first name format');
    return;
  }

  else if (!nameRegex.test(lastName)) {
    setError('Invalid last name format');
    return;
  }

  else if (!numberRegex.test(contactNumber)) {
    setError('Contact number should contain numbers only');
    return;
  }

  else if (emailError !== '') {
    setError(emailError);
    return;
  }

  else{

    setError('');

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
          .then(() => setMessage("Seeker registered!!!!"));
        
  }


      


    } else {
      // Perform sign up logic for mentor

      if (!firstName || !lastName || !contactNumber || !email) {
        setError('Please fill in all the required fields');
        return;
      }

      else if (!nameRegex.test(firstName)) {
        setError('Invalid first name format');
        return;
      }
    
      else if (!nameRegex.test(lastName)) {
        setError('Invalid last name format');
        return;
      }
    
      else if (!numberRegex.test(contactNumber)) {
        setError('Contact number should contain numbers only');
        return;
      }
    
      else if (emailError !== '') {
        setError(emailError);
        return;
      }

      else{
setError('');
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
          .then(() => setMessage("Mentor registered!!!!"));
      }


          
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
      </View>
    </View>
  );
};

export default SignUp;
