import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
              Settings
            </Text>
        </TouchableOpacity>
      </View>

    <View style={styles.contentCenter}>

      <Text style={styles.textDarkMode}>
        Dark mode
      </Text>

      <SwitchToggle
        switchOn={isToggled}
        onPress={handleToggle}
        containerStyle={{
          width: 75,
          height: 35,
          borderRadius: 30,
          padding: 5,
        }}
        circleStyle={{
          width: 25,
          height: 25,
          borderRadius: 25,
        }}
        circleColorOff="white"
        circleColorOn="white"
        backgroundColorOn='#313448'
        duration={300}
      />
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
    top: height * 0.12,
    padding: width * 0.04,
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 30,
  },
  textDarkMode: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    color: "white"
  }
});
