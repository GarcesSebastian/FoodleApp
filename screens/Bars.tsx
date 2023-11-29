import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import SwitchToggle from 'react-native-switch-toggle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function App() {
  
  const [darkMode, setDarkMode] = useState(true);

  const [timeTrial, setTimeTrial] = useState(false);
  const [otherMode, setOtherMode] = useState(false);

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

    const storedTimeTrial = await AsyncStorage.getItem('timeTrial');

    if(storedTimeTrial !== null && storedTimeTrial !== undefined){

      try {
        const storedValue = await AsyncStorage.getItem('timeTrial');
        if (storedValue !== null) {
          const parsedValue = JSON.parse(storedValue);
          setTimeTrial(parsedValue);
          console.log("eheheh");
        } else {
          console.log("No hay valor almacenado para 'darkMode'");
        }
      } catch (error) {
        console.log(error);
      }

    }else{
      try {
        const stateModes = true;
        await AsyncStorage.setItem('timeTrial', JSON.stringify(stateModes));
      } catch (error) {
        console.log(error);
      }
    }

  };
  
  checkAndHandleData();

  const navigation = useNavigation();

  const handleBackClick = () => {
    navigation.navigate("Game");
  }

  const handleTimeTrialClick = () => {
    checkAndHandleData();
    console.log(timeTrial);
  }

  const handleOtherModeClick = () => {
    setOtherMode(true);
    console.log(otherMode);
  }

  const selectedStyles = darkMode ? stylesDarkMode : stylesLightMode;

  return (
    <View style={selectedStyles.container}>

      <View style={selectedStyles.contentNav}>
        <TouchableOpacity style={selectedStyles.contentElementsNav} onPress={handleBackClick}>
            <Icon style={selectedStyles.iconMI} name="arrow-left" size={width * 0.08} />
            <Text style={selectedStyles.titleContentNav}>
              Modes
            </Text>
        </TouchableOpacity>
      </View>

    <View style={selectedStyles.contentCenter}>

    <View style={selectedStyles.contraReloj}>
        
        <TouchableOpacity style={selectedStyles.contraReloj} onPress={handleTimeTrialClick}>
          <Text style={selectedStyles.textContraReloj}>
            TIME TRIAL
          </Text>
          <IconMI style={selectedStyles.iconContentCenter} name="access-time" size={width * 0.065} />
        </TouchableOpacity>

      </View>


      <View style={selectedStyles.otherMode}>
        
        <TouchableOpacity style={selectedStyles.otherMode} onPress={handleOtherModeClick}>
          <Text style={selectedStyles.textOtherMode}>
            OTHER MODE
          </Text>
          <IconMI style={selectedStyles.iconContentCenter} name="access-time" size={width * 0.065} />
        </TouchableOpacity>

      </View>

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
    top: height * 0.13,
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
    color: "white"
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
    color: "black",
  },
  contentCenter: {
    position: "absolute",
    top: height * 0.13,
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
    color: "black",
  },
  iconContentCenter: {
    backgroundColor: "rgb(230, 230, 230)",
    padding: 5,
    borderRadius: 4,
    color: "black"
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
    color: "black",
  },
  iconMI: {
    color: "black"
  }
});

