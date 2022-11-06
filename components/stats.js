import { useFonts } from 'expo-font';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function stats({toggleStatsPage, userData}) {

  const [loaded] = useFonts({
    LatoRegular: require('../assets/fonts/Lato-Regular.ttf')
  });

  if (!loaded) {
    return null;    
  }

  const goBack = () => {
      toggleStatsPage(false);
  }

    return (
      <View style={styles.container}>
        <Pressable onPress={goBack}>
                  <Image style={styles.infoButton} source={require('../assets/closebutton.png')} />    
            </Pressable>
        <Text style={styles.titleText}> This is your stats page! {'\n'}</Text>
        <Text style={styles.text}> So far you have chosen {userData.greenQuestion} angel options {'\n'} and {userData.redQuestion} demon options!</Text>
        <Text style={styles.text}> You have played {Number(userData.greenQuestion) + Number(userData.redQuestion)} days total.</Text>
      </View>
    );
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'dodgerblue',
          alignItems: 'center',
          justifyContent: 'center',
        },
        infoButton: {
            alignSelf: "flex-end",
            margin: 5,
            width: 40,
            height: 40,
        },
        titleText: {
            fontFamily: 'LatoRegular',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            fontSize: 20,
        },
        text: {
            fontFamily: 'LatoRegular',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            fontSize: 16,
        }
    });