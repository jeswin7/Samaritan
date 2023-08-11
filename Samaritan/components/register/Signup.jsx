import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { COLORS, FONT, SIZES, strings, api } from '../../constants';
import { color } from 'react-native-reanimated';


const SignUp = (props) => {
  const [userType, setUserType] = useState('seeker');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkValidFname, setCheckValidFname] = useState(false);

  const [checkValidLname, setCheckValidLname] = useState(false);
  const [checkValidContactNumber, setCheckContactNumber] = useState(false);
  const [checkValidCountry, setCheckValidCountry] = useState(false);
  const [checkValidLocation, setCheckValidLocation] = useState(false);
  const [checkValidAddress, setCheckValidAddress] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const [checkPasswordMatch, setCheckPasswordMatch] = useState(false);

  //fname validation
  const handleCheckFname = text => {
    let nameRegex = /^[a-zA-Z]+[a-zA-Z]+$/;
    setFirstName(text);
    if (nameRegex.test(firstName)) {
      setCheckValidFname(false);
    }
    else {
      setCheckValidFname(true);
    }
  }
  //lname validation
  const handleCheckLname = text => {
    let nameRegex = /^[a-zA-Z]+[a-zA-Z]+$/;
    setLastName(text);
    if (nameRegex.test(lastName)) {
      setCheckValidLname(false);
    }
    else {
      setCheckValidLname(true);
    }
  }

  //contact number validation
  const handleCheckContactnumber = text => {
    let numberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/;
    setContactNumber(text);
    if (numberRegex.test(contactNumber)) {
      setCheckContactNumber(false);
    } else {
      setCheckContactNumber(true);
    }
  }

  //country validation
  const handleCheckCountry = text => {
    setCountry(text);
    if (text) {
      setCheckValidCountry(false);
    }
    else {
      setCheckValidCountry(true);
    }
  }
  //location validation
  const handleCheckLocation = text => {
    let locationRegex = /^[a-zA-Z]+[a-zA-Z]+$/;
    setLocation(text);
    if (locationRegex.test(text)) {
      setCheckValidLocation(false);
    }
    else {
      setCheckValidLocation(true);
    }
  }

  //address validation
  const handleCheckAddress = text => {
    let locationRegex = /^[a-zA-Z]+[a-zA-Z]+$/;
    setAddress(text);
    if (locationRegex.test(text)) {
      setCheckValidAddress(false);
    }
    else {
      setCheckValidAddress(true);
    }
  }

  //email validation
  const handleCheckEmail = text => {
    let reg = /\S+@\S+\.\S+/;
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    setEmail(text);
    if (reg.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  }

  // password validation
  const handleCheckPassword = text => {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,20}$/;
    setPassword(text);
    if (passwordRegex.test(text)) {
      setCheckValidPassword(false);
    }
    else {
      setCheckValidPassword(true);
    }
  }

  //confirm password validation
  const handleCheckConfirmpassword = conf => {
    setConfirmPassword(conf);
    if (password === conf) {
      setCheckPasswordMatch(false);
    } else {
      setCheckPasswordMatch(true);
    }
  }

  const countrylist = [
    { key: '1', value: 'India' },
    { key: '2', value: 'China' },
    { key: '3', value: 'UK' },
  ]

  const handleSignUp = () => {
    if (userType === 'seeker') {
      // Perform form validations
      if (!firstName || !lastName || !contactNumber || !email || !password || !confirmPassword) {
        alert(strings.emptyfieldError);
      }

      else {
        // POST API
        fetch(api.apiUrl + '/addseeker', {
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
          .then(() =>     Alert.alert(
            'Successfully Registered!', // Specify the desired title here
            ``,
            [
              { text: 'Done', onPress: () =>  props.registered()}
            ]
          ));

      }





    } else {
      // Perform sign up logic for mentor

      if (!firstName || !lastName || !contactNumber || !email) {
        alert(strings.emptyfieldError);
        return;
      }

      else {
        // POST API
        fetch(api.apiUrl + '/addmentor', {
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
          .then(() =>     Alert.alert(
            'Successfully Registered!', // Specify the desired title here
            ``,
            [
              { text: 'Done', onPress: () =>  props.registered()}
            ]
          ));
      }



    }

   
  };

  return (
    <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: '90%' }}>
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
              <Text style={{ color: userType === 'seeker' ? COLORS.white : COLORS.secondary, fontSize: SIZES.large }}>Seeker</Text>
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
              <Text style={{ color: userType === 'mentor' ? COLORS.white : COLORS.secondary, fontSize: SIZES.large }}>Mentor</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <TextInput
              placeholder={strings.firstName}
              value={firstName}
              onChangeText={handleCheckFname}
              placeholderTextColor={COLORS.secondary}
              style={styles.TextField}
            />
            {checkValidFname && (<Text style={styles.invalidText}>{strings.fnameError}</Text>)}
            <TextInput
              placeholder={strings.lastName}
              value={lastName}
              onChangeText={handleCheckLname}
              placeholderTextColor={COLORS.secondary}
              style={styles.TextField}
            />
            {checkValidLname && (<Text style={styles.invalidText}>{strings.lnameError}</Text>)}
            <TextInput
              placeholder={strings.contactNumber}
              value={contactNumber}
              onChangeText={handleCheckContactnumber}
              placeholderTextColor={COLORS.secondary}
              style={styles.TextField}
            />
            {checkValidContactNumber && (<Text style={styles.invalidText}>{strings.contactnumberError}</Text>)}
            {userType === 'seeker' && (

              <SelectList
                data={countrylist}
                setSelected={(val) => setCountry(val)}
                search={false}
                boxStyles={styles.dropdownbox}
                dropdownStyles={styles.dropdownbox}
                dropdownTextStyles={styles.dropdowntext}
                placeholderTextColor={COLORS.secondary}
                placeholder={strings.country}
              />
            )}
            {checkValidCountry && (<Text style={styles.invalidText}>{strings.countryError}</Text>)}
            {userType === 'seeker' && (
              <TextInput
                placeholder={strings.location}
                value={location}
                placeholderTextColor={COLORS.secondary}
                onChangeText={handleCheckLocation}
                style={styles.TextField}
              />
            )}
            {checkValidLocation && (<Text style={styles.invalidText}>{strings.locationError}</Text>)}
            <TextInput
              placeholder={strings.address}
              value={address}
              placeholderTextColor={COLORS.secondary}
              onChangeText={handleCheckAddress}
              style={styles.TextField}
            />

            {checkValidLocation && (<Text style={styles.invalidText}>{strings.addressError}</Text>)}
            <TextInput
              placeholder={strings.email}
              value={email}
              placeholderTextColor={COLORS.secondary}
              onChangeText={handleCheckEmail}
              style={styles.TextField}
            />
            {checkValidEmail && (<Text style={styles.invalidText}>{strings.invalidEmail}</Text>)}

            {userType === 'seeker' && <>
              <TextInput
                placeholder={strings.password}
                secureTextEntry={true}
                value={password}
                placeholderTextColor={COLORS.secondary}
                onChangeText={handleCheckPassword}
                style={styles.TextField}
              />
              {checkValidPassword && (<Text style={styles.invalidText}>{strings.passwordError}</Text>)}

              <TextInput
                placeholder={strings.confirmPassword}
                secureTextEntry
                value={confirmPassword}
                placeholderTextColor={COLORS.secondary}
                onChangeText={handleCheckConfirmpassword}
                style={styles.TextField}
              />
              {checkPasswordMatch && (<Text style={styles.invalidText}>{strings.pwdmatchError}</Text>)}

            </>}


            <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
              <Text style={styles.signUpText}>{strings.signUp}</Text>
            </TouchableOpacity>


          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  TextField: {
    paddingVertical: 12,
    backgroundColor: COLORS.tertiary,
    fontSize: SIZES.medium,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginTop: SIZES.large
  },
  signUpButton: {
    marginVertical: 40,
    elevation: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  signUpText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    alignSelf: "center",
  },

  dropdown: {
    paddingVertical: 12,
    backgroundColor: COLORS.tertiary,
    fontSize: SIZES.medium,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginTop: SIZES.medium,
    borderColor: COLORS.tertiary
  },

  dropdownbox: {
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.tertiary,
    //height: 50,
    maxHeight: 200,
    marginTop: SIZES.large
  },
  dropdowntext: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: 'bold'
  },

  invalidText: {
    color: COLORS.red,
    paddingVertical: 5,
    paddingLeft: 8
  }
});

export default SignUp;
