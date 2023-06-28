import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {  COLORS, FONT, SIZES, strings  } from '../../constants';


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
  const [checkFnameFormat, setCheckFormatFname] = useState(false);

  const [checkValidLname, setCheckValidLname] = useState(false);
  const [checkValidcontactNumber, setCheckcontactNUmber] = useState(false);
  const [checkValidCountry, setCheckValidCountry] = useState(false);
  const [checkValidLocation, setCheckValidLocation] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const [checkValidconfirmPwd, setCheckValdconfirmPwd] = useState(false);
  const [checkPasswordmatch, setcheckpasswordmatch] = useState(false);
  const [checkContactformat, setCheckcontactformat] = useState(false);

  //fname validation
  const handleCheckFname = text => {
    let nameRegex = /^[A-Za-z]+$/;
    setFirstName(text);
    if(!firstName){
      setCheckValidFname(false);
    }
    else if(!nameRegex.test(firstName)){
      setCheckFormatFname(false);
    }
    else{
      setCheckValidFname(true);
      setCheckFormatFname(true);
    }
  }
   //lname validation
   const handleCheckLname = text => {
    setLastName(text);
    if(!lastName){
      setCheckValidLname(false);  
    }
    else{
      setCheckValidLname(true);
    }
   }

   //contact number validation
   const handleCheckContactnumber = text =>{
    let numberRegex = /^[0-9]+$/;
    setContactNumber(text);
    if(!contactNumber){
      setCheckcontactNUmber(false);
    }
    else if(!numberRegex.test(contactNumber)){
       setCheckcontactformat(false);
    }else{
      setCheckcontactNUmber(true);
      setCheckcontactformat(true);
    }
   }

  //country validation
  const handleCheckCountry = text => {
    setCountry(text);
    if(!country){
      setCheckValidCountry(false);
    }  
    else{
      setCheckValidCountry(true);
    }  
  }
   //location validation
   const handleCheckLocation= text => {
    setLocation(text);
    if(!location){
      setCheckValidLocation(false);
    }
    else{
      setCheckValidLocation(true);
    }
   }

  //email validation
  const handleCheckEmail = text => {
    let reg = /\S+@\S+\.\S+/;
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    setEmail(text);
    if(reg.test(text) || regex.test(text)){
      setCheckValidEmail(false);
    }else{
      setCheckValidEmail(true);
    }
  }

  // password validation
  const handleCheckPassword = text => {
    setPassword(text);
    if(!password){
      setCheckValidPassword(false); 
    }
    else{
      setCheckValidPassword(true);
    }
  }
  
  //confirm password validation
  const handleCheckConfirmpassword = text => {
    setConfirmPassword(text);
    if(!confirmPassword){
      setCheckValdconfirmPwd(false);
    }
    else if(password !== confirmPassword){
      setcheckpasswordmatch(false);
    }else{
      setCheckValdconfirmPwd(true);
      setcheckpasswordmatch(true);
    }
  }
 
  const countrylist = [
    {key:'1', value:'India'},
    {key:'2', value:'China'},
    {key:'3', value:'UK'},
   ]

  const handleSignUp = () => {
    if (userType === 'seeker') {
  // Perform form validations
  if (!firstName || !lastName || !contactNumber || !email || !password || !confirmPassword) {
    alert(strings.emptyfieldError);
  }

  // else if (password !== confirmPassword) {
  //   alert(strings.pwdmatchError);
  // }
  // else if (!nameRegex.test(firstName)) {
  //   setError('Invalid first name format');
  //   return;
  // }

  // else if (!nameRegex.test(lastName)) {
  //   setError('Invalid last name format');
  //   return;
  // }

  // else if (!numberRegex.test(contactNumber)) {
  //   setError('Contact number should contain numbers only');
  //   return;
  // }

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
        alert(strings.emptyfieldError);
        return;
      }

      // else if (!nameRegex.test(firstName)) {
      //   setError('Invalid first name format');
      //   return;
      // }
    
      // else if (!nameRegex.test(lastName)) {
      //   setError('Invalid last name format');
      //   return;
      // }
    
      // else if (!numberRegex.test(contactNumber)) {
      //   setError('Contact number should contain numbers only');
      //   return;
      // }
    
      // else if (emailError !== '') {
      //   setError(emailError);
      //   return;
      // }

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
          <Text style={{color: userType === 'seeker' ? COLORS.white : COLORS.primary,fontSize: SIZES.large }}>Seeker</Text>
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
          <Text style={{color: userType === 'mentor' ? COLORS.white : COLORS.primary,fontSize: SIZES.large }}>Mentor</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <TextInput
          placeholder={strings.firstName}
          value={firstName}
          onChangeText={handleCheckFname}
          style={styles.TextField}
        />
        {checkValidFname ? (<Text style={styles.invalidText}>{strings.fnameError}</Text>): (<Text></Text>)}
        {checkFnameFormat ? (<Text style={styles.invalidText}>{strings.fnameformatError}</Text>): (<Text></Text>)}
        <TextInput
          placeholder={strings.lastName}
          value={lastName}
          onChangeText={handleCheckLname}
          style={styles.TextField}
        />
        {checkValidLname ? (<Text style={styles.invalidText}>{strings.lnameError}</Text>): (<Text></Text>)}
        <TextInput
          placeholder={strings.contactNumber}
          value={contactNumber}
          onChangeText={handleCheckContactnumber}
          style={styles.TextField}
        />
        {checkValidcontactNumber ? (<Text style={styles.invalidText}>{strings.contactnumberError}</Text>): (<Text></Text>)}
        {checkContactformat ? (<Text style={styles.invalidText}>{strings.contactformatError}</Text>): (<Text></Text>)}
        {userType === 'seeker' && (
         
          <SelectList data = {countrylist} setCountry={setCountry} 
          boxStyles={styles.TextField}
          value={country}
          onChangeText= {handleCheckCountry}
          dropdownStyles={styles.dropdownbox}
          placeholder= {strings.country}
          dropdownTextStyles={styles.dropdowntext}/>
          // <TextInput
          //   placeholder = {strings.country}
          //   value={address}
          //   onChangeText={(text) => setAddress(text)}
          //   style={styles.TextField}
          // />
        )}
        {checkValidCountry ? (<Text style={styles.invalidText}>{strings.countryError}</Text>): (<Text></Text>)}
        {userType === 'seeker' && (
          <TextInput
            placeholder={strings.location}
            value={location}
            onChangeText={handleCheckLocation}
            style={styles.TextField}
          />
        )}
        {checkValidLocation ? (<Text style={styles.invalidText}>{strings.locationError}</Text>): (<Text></Text>)}
        <TextInput
          placeholder={strings.email}
          value={email}
          onChangeText={handleCheckEmail}
          style={styles.TextField}
        />
        {checkValidEmail ? (<Text style={styles.invalidText}>{strings.invalidEmail}</Text>): (<Text></Text>)}

        {userType === 'seeker' && <>
        <TextInput
          placeholder={strings.password}
          secureTextEntry={true}
          value={password}
          onChangeText={handleCheckPassword}
          style={styles.TextField}
        />
        {checkValidPassword ? (<Text style={styles.invalidText}>{strings.passwordError}</Text>): (<Text></Text>)}

        <TextInput
          placeholder={strings.confirmPassword}
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleCheckConfirmpassword}
          style={styles.TextField}
        />
        {checkValidconfirmPwd ? (<Text style={styles.invalidText}>{strings.confirmPasswordError}</Text>): (<Text></Text>)}
        {checkPasswordmatch ? (<Text style={styles.invalidText}>{strings.pwdmatchError}</Text>): (<Text></Text>)}

        </>}


        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpText}>{strings.signUp}</Text>
  </TouchableOpacity>

  
  </View>
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
    marginTop: SIZES.medium,
    borderColor: COLORS.tertiary,
  },
  signUpButton: {
    marginVertical: 40,
    elevation: 8,
    backgroundColor: COLORS.primary,
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
  
  dropdown:{
    paddingVertical: 12,  
    backgroundColor: COLORS.tertiary,
    fontSize: SIZES.medium,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginTop: SIZES.medium,
    borderColor: COLORS.tertiary
  },

  dropdownbox:{
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.tertiary,
    maxHeight:200,
  },
  dropdowntext: {
    color: COLORS.gray, 
  },

  invalidText : {
    color : COLORS.red,
    paddingVertical: 5,
    paddingLeft: 8
},
});

export default SignUp;
