import { StyleSheet, Image, Text, View, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "../config";

export default function login({ setLogin, setupEmail, getQuestions }) {
  const [email, setEmail] = useState("ameces1@gmail.com");
  const [password, setPassword] = useState("ameces");

  function HandleLogin() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLogin(true);
        setupEmail(email);
        getQuestions();
      })
      .catch((error) => {
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-email"
        ) {
          alert("Invalid credentials!");
        } else if (error.code === "auth/too-many-requests") {
          alert("Too many attemps, your account will be locked temporarily.");
        } else {
          alert("Oops, something went wrong! Try again.");
          console.log(error.code);
          console.log(error.message);
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />
      <Text style={styles.username}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        onPress={HandleLogin}
        title="Login"
        accessibilityLabel="Press to login"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19a845",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 20,
    padding: 20,
    color: "white",
  },
  username: {
    padding: 1,
    fontSize: 20,
  },
  infoButton: {
    alignSelf: "flex-end",
    margin: 5,
    width: 40,
    height: 40,
  },
  input: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
});
