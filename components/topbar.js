import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  Modal,
} from "react-native";
import { useState } from "react";

export default function topbar({ statsButtonPressed, loggedin }) {
  const [modalVisible, setModalVisible] = useState(false);

  const goBack = () => {
    statsButtonPressed(true);
  };
  const logout = () => {
    loggedin(false);
  };

  function close() {
    setModalVisible(false);
  }
  return (
    <View style={styles.topBar}>
      <StatusBar hidden />
      <Pressable onPress={logout}>
        <Image
          style={styles.infoButton}
          source={require("../assets/logouticon.png")}
        />
      </Pressable>
      <Pressable onPress={goBack}>
        <Image
          style={styles.infoButton}
          source={require("../assets/statsicon.png")}
        />
      </Pressable>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          style={styles.infoButton}
          source={require("../assets/infoicon2.png")}
        />
        <Modal
          visible={modalVisible}
          onRequestClose={close}
          transparent={false}
        >
          <View style={styles.modal}>
            <Pressable onPress={close}>
              <Image
                style={styles.infoButton}
                source={require("../assets/closebutton.png")}
              />
            </Pressable>
            <Text style={styles.infoText}>
              Welcome to the Angel or Demon app! {"\n"}
              {"\n"} This is an application inspired by the New York Times
              Wordle. {"\n"}
              {"\n"}Much like in Wordle in AoD-app you can play one game daily.{" "}
              {"\n"}
              {"\n"}In this game you have a decision to be made. Will you take
              new activity in your life or will you get rid of an existing one?{" "}
              {"\n"}
              {"\n"}Choose wisely as the game will remember your decisions!
            </Text>
          </View>
        </Modal>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row-reverse",
    height: 50,
    backgroundColor: "#ddd",
  },
  infoButton: {
    alignSelf: "flex-end",
    margin: 5,
    width: 40,
    height: 40,
  },
  modal: {
    marginTop: "40%",
    padding: 40,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontFamily: "LatoRegular",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
