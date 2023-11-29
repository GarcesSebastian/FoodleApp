import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import SwitchToggle from 'react-native-switch-toggle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function App() {

  const [darkMode, setDarkMode] = useState(true);

  let setStoreData = async (date: boolean) => {{
    try{
      const stateDarkMode = date;
      setDarkMode(stateDarkMode);
      await AsyncStorage.setItem('darkMode', JSON.stringify(stateDarkMode));
    }catch(error){
      console.log(error);
    }
  }}

  let storeData = async () => {
    try {
      const stateDarkMode = true;
      setDarkMode(stateDarkMode);
      await AsyncStorage.setItem('darkMode', JSON.stringify(stateDarkMode));
    } catch (error) {
      console.log(error);
    }
  };  
  
  let retrieveData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('darkMode');
      if (storedValue !== null) {
        const parsedValue = JSON.parse(storedValue);
        setDarkMode(parsedValue);

        if(parsedValue){
          setToggled(true);
        }else{
          setToggled(false);
        }
      } else {
        console.log("No hay valor almacenado para 'darkMode'");
      }
    } catch (error) {
      console.log(error);
    }
  };  
  
  let checkAndHandleData = async () => {
    const storedData = await AsyncStorage.getItem('darkMode');
  
    if (storedData !== null && storedData !== undefined) {
      retrieveData();
    } else {
      storeData();
    }
  };
  
  checkAndHandleData();

  const navigation = useNavigation();

  const handleBackClick = () => {
    navigation.navigate("Game");
  }

  const [isToggled, setToggled] = useState(true);

  const handleToggle = () => {
    setToggled(!isToggled);
    setStoreData(!isToggled);
  };

  const selectedStyles = darkMode ? stylesDarkMode : stylesLightMode;

  return (
    <View style={selectedStyles.container}>

      <View style={selectedStyles.contentNav}>
        <TouchableOpacity style={selectedStyles.contentElementsNav} onPress={handleBackClick}>
            <Icon style={selectedStyles.iconMI} name="arrow-left" size={width * 0.08}/>
            <Text style={selectedStyles.titleContentNav}>
              Settings
            </Text>
        </TouchableOpacity>
      </View>

    <View style={selectedStyles.contentCenter}>

      <Text style={selectedStyles.textDarkMode}>
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

const stylesDarkMode = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(19, 20, 28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentNav: {
    position: "absolute",
    top: height * 0.06,
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
    top: height * 0.15,
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
  },
  iconMI: {
    color: "white"
  }
});

const stylesLightMode = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentNav: {
    position: "absolute",
    top: height * 0.06,
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
    color: "black"
  },
  contentCenter: {
    position: "absolute",
    top: height * 0.15,
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
    color: "black"
  },
  iconMI: {
    color: "black"
  }
});

