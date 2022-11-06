import { useFonts } from "expo-font";
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
  View,
  Pressable,
  Modal,
} from "react-native";
import { useState, useEffect, useReducer } from "react";
import Stats from "./components/stats";
import TopBar from "./components/topbar";
import {
  firestore,
  collection,
  onSnapshot,
  query,
  setDoc,
  USERS,
  doc,
  getDoc,
} from "./config";
import Login from "./components/login";

export default function App() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const [logged, setLogged] = useState(false);
  const [userEmail, setUserEmail] = useState(0);
  const [user, setUser] = useState("");

  const [greenPressed, setGreenPressed] = useState(false);
  const [redPressed, setRedPressed] = useState(false);
  const [statsPressed, setStatsPressed] = useState(false);

  const [textAngel, setTextAngel] = useState(
    "Take a 10 minute walk in the park"
  );
  const [textDemon, setTextDemon] = useState(
    "Watch sports for 10 minutes on the Internet"
  );

  useEffect(() => {
    forceUpdate();

    const q = query(collection(firestore, USERS));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          greenQuestion: doc.data().greenQuestion,
          redQuestion: doc.data().redQuestion,
          email: doc.data().email,
        };
        tempMessages.push(messageObject);

        if (messageObject != null) {
          setUser(messageObject);
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function GetQuestions() {
    const docRef = doc(firestore, "questions", CheckTheDate());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTextAngel(docSnap.data().greenQuestion);
      setTextDemon(docSnap.data().redQuestion);
    } else {
      // doc.data() will be undefined in this case
      console.log("No question in the database");
    }
  }

  const [loaded] = useFonts({
    LatoRegular: require("./assets/fonts/Lato-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  function CheckTheDate() {
    var currentDate = new Date();

    var currentDay = "" + currentDate.getDate();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();

    return currentDay + currentMonth + currentYear;
  }

  function TextHandler(isGreen) {
    if (isGreen) {
      setTextAngel("You chose the Angel option!");
      setTextDemon("You chose the Angel option!");
    } else {
      setTextDemon("You chose the Devil option!");
      setTextAngel("You chose the Devil option!");
    }
  }

  function ButtonHandler(isGreen) {
    if (isGreen) {
      setGreenPressed(true);
      TextHandler(true);
      UpdateFirebase(true);
    } else {
      UpdateFirebase(false);
      setRedPressed(true);
      TextHandler(false);
    }
  }

  async function UpdateFirebase(bool) {
    if (bool) {
      await setDoc(doc(firestore, USERS, user.id), {
        greenQuestion: user.greenQuestion + 1,
        redQuestion: user.redQuestion,
        email: user.email,
      });
    } else {
      await setDoc(doc(firestore, USERS, user.id), {
        greenQuestion: user.greenQuestion,
        redQuestion: user.redQuestion + 1,
        email: user.email,
      });
    }
  }

  if (!logged) {
    return (
      <Login
        setLogin={setLogged}
        setupEmail={setUserEmail}
        getQuestions={GetQuestions}
      />
    );
  } else if (statsPressed) {
    return <Stats toggleStatsPage={setStatsPressed} userData={user} />;
  } else if (greenPressed || redPressed) {
    return (
      <View style={styles.container}>
        <TopBar statsButtonPressed={setStatsPressed} loggedin={setLogged} />
        <View style={styles.buttonGreen}>
          <Image source={require("./assets/greenboxchecked.png")} />
          <Text style={styles.buttonGreenText}>{textAngel}</Text>
        </View>
        <View>
          <Image
            style={styles.graybox}
            source={require("./assets/graybox.png")}
          />
        </View>
        <View>
          <View style={styles.buttonRed}>
            <Image source={require("./assets/redboxchecked.png")} />
            <Text style={styles.buttonRedText}>{textDemon}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TopBar statsButtonPressed={setStatsPressed} loggedin={setLogged} />
        <TouchableHighlight onPress={() => ButtonHandler(true)}>
          <View style={styles.buttonGreen}>
            <Image source={require("./assets/greenbox.png")} />
            <Text style={styles.buttonGreenText}>{textAngel}</Text>
          </View>
        </TouchableHighlight>
        <View>
          <Image
            style={styles.graybox}
            source={require("./assets/graybox.png")}
          />
        </View>
        <View>
          <TouchableHighlight onPress={() => ButtonHandler(false)}>
            <View style={styles.buttonRed}>
              <Image source={require("./assets/redbox.png")} />
              <Text style={styles.buttonRedText}>{textDemon}.</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 50,
    backgroundColor: "#ddd",
  },
  buttonGreen: {
    justifyItems: "center",
    alignItems: "space-around",
    width: "100%",
    height: "40%",
  },
  buttonRed: {
    justifyItems: "center",
    alignItems: "space-around",
    width: "100%",
    height: "40%",
  },
  graybox: {
    width: "100%",
    height: 50,
  },
  buttonGreenText: {
    fontFamily: "LatoRegular",
    textAlign: "center",
    position: "absolute",
    paddingTop: 120,
    paddingBottom: 100,
    paddingLeft: 50,
    paddingRight: 50,
    color: "#fff",
    fontSize: 20,
  },
  buttonRedText: {
    fontFamily: "LatoRegular",
    textAlign: "center",
    position: "absolute",
    paddingTop: 140,
    paddingBottom: 100,
    paddingLeft: 50,
    paddingRight: 50,
    color: "#fff",
    fontSize: 20,
  },
  infoText: {
    fontFamily: "LatoRegular",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
