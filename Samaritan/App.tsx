import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Button, TextInput } from 'react-native';


const PostRequestExample = () => {

	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setMessage] = useState("");

	const postExample = async () => {


    // GET API 
    // fetch("http://10.211.55.3:3001/users")
    // .then(response => response.json())
    // .then((responseJson) => {
    //     console.log('getting data from fetch', responseJson)
    // })
    // .catch(error => console.log(error))


    //     fetch("http://10.211.55.3:3001/adduser")
    // .then(response => response.json())
    // .then((responseJson) => {
    //     console.log('getting data from fetch', responseJson)
    // })
    // .catch(error => console.log(error))




    // POST API
    fetch('http://10.211.55.3:3001/adduser', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: username,
    pwd: password,
  })
})
.then(()=>setMessage("User registered!!!!"));
    
	}






	return (
		<View>


      <TextInput

        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
      />
      <TextInput

        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <Text>{successMsg}</Text>
      <Button title={"Sign Up"} onPress={postExample} />
		</View>
	)

  }

export default PostRequestExample;
