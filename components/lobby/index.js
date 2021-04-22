import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Lobby = props => {
  const [error, setError] = useState('');

  //write the startGame function here
  const startGame = () => {
    if ((props.GameData !== undefined) && (props.GameData.owner === props.auth.uid) && (props.GameData.players.length > 1)) {


        let playerX = { displayName: '', uid: '', avatar: '' };
        let playerO = { displayName: '', uid: '', avatar: '' };
        while (playerX.uid === playerO.uid) {
          playerX = getRandomPlayer(props.GameData.players);
          playerO = getRandomPlayer(props.GameData.players);
        }
        return setRoles(playerX, playerO)
          .then(response => {
            if (response.hasError) {
              let friendlyError = { friendly: "Something has gone terribly wrong.", technical: response.value.toString() };
              setError(() => { throw friendlyError });
            }
          });
    }
  };

  //write the getRandomPlayer function here
  const getRandomPlayer = players => {
    return players[Math.floor(Math.random() * players.length)];
  };

  //write the setRoles function here
  const setRoles = (playerX, playerO) => {
    return firestore().collection("ttt-games").doc(props.GameID).update({
      status: "playing",
      playerX: playerX,
      playerO: playerO,
      rounds: 0,
      grid: ["","","","","","","","",""],
    })
    .then(() => {
      return { hasError: false, value: null };
    })
    .catch(err => {
      return { hasError: true, value: err };
    });
  };

  //if props.GameData is undefined, the game may have been deleted from the database. Take the player back to the greeting screen
  if (props.GameData === undefined) {
    props.changeScreen('greeting');
    return null;
  }

  return (
    <View style={props.styles.aoGameContainer}>
      <View style={props.styles.aoGameInnerContainer}>
        <View style={props.styles.aoLobbyContainer}>
        <Image style={props.styles.aoGreetingsImage} source={require('./img/background.png')} resizeMode={"cover"} />
            <Text style={props.styles.lobbyText}>
              {"Your friends can join your game using this code:"}
            </Text>
            <Text style={props.styles.aoGameCode}>
              {props.GameData.gameCode}
            </Text>
            <>
              {props.GameData.players.map((player, index) => (
                <View key={index} style={props.styles.aoPlayerRow}>
                  <Image source={{uri: 'data:image/png;base64, ' + player.avatar}} style={props.styles.aoPlayerRowAvatar} />
                  <Text style={props.styles.aoPlayerRowName}>
                    {player.displayName}
                  </Text>
                </View>
              ))}
            </>
            {(props.GameData.owner === props.auth.uid && props.GameData.players.length > 1) ? (
            <TouchableOpacity style={{...props.styles.aoPrimaryButton, marginTop:400}} onPress={() => startGame()}>
              <Text style={props.styles.aoPrimaryButtonText}>
                {"Let's Play"}
              </Text>
            </TouchableOpacity>
          ) : (
            null
          )}
          </View>
          <Text style={{...props.styles.aoText, marginTop:0, marginBottom:50, color: "#000000", fontFamily: 'Heebo-black',fontSize: 34,}}>
            {props.GameData.players.length < 2 ? "Waiting..." : null}
          </Text>
      </View>
    </View>
  );
};

export default Lobby;
