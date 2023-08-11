import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS, FONT, SIZES, strings, api } from '../../constants';
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);

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

  const postAPI = async () => {
    console.log("@postAPI")
    const url = api.apiUrl+`/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      console.log('Response data::::::::::::::::::::::::::::::::::', data);

      // Process the response data
      if (data.status === 200 && data.userId)
        props.isValid(data.role, data.userId);
        
      else
        alert(strings.invalidUser);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  }

  const handleLogin = () => {
    props.isValid();
    // Perform login logic here
    console.log('Logging in...', email, password);
    if (!email && !password) {
      alert(strings.loginError);
    } else if (!email) {
      alert(strings.emailError)
    } else if (!password) {
      alert(strings.passwordError)
    } else {
      postAPI();
    }
  };

  const handleForgotPassword = () => {
    // Perform forgot password logic here
    console.log('Forgot Password...');
    props.forgotPassword();
  };

  const handleNewuser = () => {
    props.isNewUser();
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <TextInput
            style={styles.emailTextField}
            placeholder={strings.email}
            value={email}
            placeholderTextColor={COLORS.secondary}
            onChangeText={handleCheckEmail}
          />
          {checkValidEmail ? (<Text style={styles.invalidText}>{strings.invalidEmail}</Text>) : (<Text></Text>)}
          <TextInput
            style={styles.passwordTextField}
            placeholder={strings.password}
            placeholderTextColor={COLORS.secondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handleForgotPassword}
            style={styles.forgotPasswordTextField}>
            <Text style={styles.forgotPwdText}>{strings.forgotPassword}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
            <Text style={styles.signInText}>{strings.signIn}</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={handleNewuser}
            style={styles.signUpTextField}>
            <Text style={styles.newToText}>{strings.newTo}</Text>
            <Text style={styles.signUpText}>{strings.signUp}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.secondary
  },
  emailTextField: {
    paddingVertical: 12,
    backgroundColor: COLORS.tertiary,
    fontSize: SIZES.medium,
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },
  passwordTextField: {
    paddingVertical: 12,
    backgroundColor: COLORS.tertiary,
    fontSize: SIZES.medium,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginTop: SIZES.medium,
  },
  forgotPasswordTextField: {
    flex: 1,
    marginVertical: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  signInButton: {
    marginVertical: 40,
    elevation: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  signInText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
  signUpTextField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  newToText: {
    color: COLORS.secondary,
    fontSize: SIZES.large,
  },
  forgotPwdText: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontWeight: 'bold'
  },
  signUpText: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontWeight: 'bold'
  },
  invalidText: {
    color: COLORS.red,
    paddingVertical: 5,
    paddingLeft: 8
  }
});

export default Login;