import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import SwitchToggle from 'react-native-switch-toggle';


const { width, height } = Dimensions.get('window');

export default function App() {

  const navigation = useNavigation();

  const handleBackClick = () => {
    navigation.navigate("Game");
  }

  const [isToggled, setToggled] = useState(true);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  return (
    <View style={styles.container}>

      <View style={styles.contentNav}>
        <TouchableOpacity style={styles.contentElementsNav} onPress={handleBackClick}>
            <Icon name="arrow-left" size={width * 0.08} color="white" />
            <Text style={styles.titleContentNav}>
              Modes
            </Text>
        </TouchableOpacity>
      </View>

    <View style={styles.contentCenter}>

    <View style={styles.contraReloj}>
        
        <TouchableOpacity style={styles.contraReloj}>
          <Text style={styles.textContraReloj}>
            TIME TRIAL
          </Text>
          <IconMI style={styles.iconContentCenter} name="access-time" size={width * 0.065} color="white" />
        </TouchableOpacity>

      </View>


      <View style={styles.otherMode}>
        
        <TouchableOpacity style={styles.otherMode}>
          <Text style={styles.textOtherMode}>
            OTHER MODE
          </Text>
          <IconMI style={styles.iconContentCenter} name="access-time" size={width * 0.065} color="white" />
        </TouchableOpacity>

      </View>

    </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(19, 20, 28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentNav: {
    position: "absolute",
    top: height * 0.03,
    padding: width * 0.04,
    width: "100%",
    height: "auto",
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 30
  },
  contentElementsNav: {
    width: "auto",
    height: "auto",
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 30
  },
  titleContentNav: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    color: "white"
  },
  contentCenter: {
    position: "absolute",
    top: height * 0.1,
    left: width * 0.04,
    padding: width * 0.04,
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 30,
  },
  contraReloj: {
    position: "absolute",
    top: height * 0.02,
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 15,
  },
  textContraReloj: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    color: "white"
  },
  iconContentCenter: {
    backgroundColor: "rgb(65, 68, 88)",
    padding: 5,
    borderRadius: 4,
  },
  otherMode: {
    position: "absolute",
    top: height * 0.06,
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 15,
  },
  textOtherMode: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    color: "white"
  },
});
