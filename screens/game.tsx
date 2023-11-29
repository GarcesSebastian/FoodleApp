import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function App() {
  
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('¡Almacenamiento borrado con éxito!');
    } catch (error) {
      console.error('Error al borrar el almacenamiento:', error);
    }
  };

  const [darkMode, setDarkMode] = useState(true);

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
  };
  
  console.log(darkMode);

  const navigation = useNavigation();

  let isWinner = false;

  const [matrizFinally, setMatrizFinally] = useState(
    ["", "", "", "", ""]
  );

  useFocusEffect(
    React.useCallback(() => {
      let checkAndHandleData = async () => {
        const storedData = await AsyncStorage.getItem('darkMode');
  
        if (storedData !== null && storedData !== undefined) {
          retrieveData();
        } else {
          storeData();
        }
      };
  
      checkAndHandleData();
  
    }, [])
  );

  useEffect(() => {

    const generateRandomMatrix = () => {
      const newMatrizFinally = [...matrizFinally];

      for(let i = 0; i < newMatrizFinally.length; i++){
        newMatrizFinally[i] = (Math.floor(Math.random() * 10) + 1).toString();
      }

      setMatrizFinally(newMatrizFinally);
    };

    generateRandomMatrix();
    
  }, []); 

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [rowOne, setRowOne] = useState(true);
  const [rowTwo, setRowTwo] = useState(false);
  const [rowThree, setRowThree] = useState(false);
  const [rowFour, setRowFour] = useState(false);
  const [rowFive, setRowFive] = useState(false);

  const [matriz, setMatriz] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ]);

  const [rowsGreen, setRowsGreen] = useState(
    [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]
  );

  const [rowsGray, setRowsGray] = useState(
    [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]
  );

  const [rowsYellow, setRowsYellow] = useState(
    [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]
  );

  const restartGame = () => {
    const newMatriz = [...matriz];
    const newMatrizFinally = [...matrizFinally];

    for(let col = 0; col < newMatriz[0].length; col++){
      for(let fil = 0; fil < newMatriz[0].length; fil++){
        newMatriz[col][fil] = "";
      }
    }

    for(let i = 0; i < newMatrizFinally.length; i++){
      newMatrizFinally[i] = (Math.floor(Math.random() * 10) + 1).toString();
    }

    setMatriz(newMatriz);
    setMatrizFinally(newMatrizFinally);

    const newRowsGreen = [...rowsGreen];
    const newRowsYellow = [...rowsYellow];
    const newRowsGray = [...rowsGray];

    for(let col = 0; col < newRowsGreen[0].length; col++){
      for(let fil = 0; fil < newRowsGreen[0].length; fil++){
        newRowsGreen[col][fil] = "";
      }
    }

    for(let col = 0; col < newRowsYellow[0].length; col++){
      for(let fil = 0; fil < newRowsYellow[0].length; fil++){
        newRowsYellow[col][fil] = "";
      }
    }

    for(let col = 0; col < newRowsGray[0].length; col++){
      for(let fil = 0; fil < newRowsGray[0].length; fil++){
        newRowsGray[col][fil] = "";
      }
    }

    setRowsGreen(newRowsGreen);
    setRowsYellow(newRowsYellow);
    setRowsGray(newRowsGray);

    setRowOne(true);
    setRowTwo(false);
    setRowThree(false);
    setRowFour(false);
    setRowFive(false);

    isWinner = false;
  }

  const verifyIsState = () => {

    if(rowOne){
      const newRowsGreen = [...rowsGreen];
      const newRowsYellow = [...rowsYellow];
      const newRowsGray = [...rowsGray];
  
        for (let j = 0; j < matriz[0].length; j++) {
          if (matrizFinally[j] === matriz[0][j]) {
            newRowsGreen[0][j] = matriz[0][j].toString();
          }else{
            for(let x = 0; x < matriz[0].length; x++){
              if(matrizFinally[j] === matriz[0][x] && matriz[0][x] !== matriz[0][j]){
                newRowsYellow[0][x] = matriz[0][x];
                break;
              }else{
                newRowsGray[0][x] = matriz[0][x];
              }
            }
          }
        }
  
      setRowsGreen(newRowsGreen);
      setRowsYellow(newRowsYellow);
      setRowsGray(newRowsGray);

      for(let i = 0; i < rowsGreen.length; i++){
        if(rowsGreen[0][i] !== ""){
          isWinner = true;
        }else{
          isWinner = false;
          break;
        }
      }

      if(isWinner){
        setTimeout(() => {
          restartGame();
        },1000);
      }

    }else if(rowTwo){
      const newRowsGreen = [...rowsGreen];
      const newRowsYellow = [...rowsYellow];
      const newRowsGray = [...rowsGray];
  
        for (let j = 0; j < matriz[1].length; j++) {
          if (matrizFinally[j] === matriz[1][j]) {
            newRowsGreen[1][j] = matriz[1][j].toString();
          }else{
            for(let x = 0; x < matriz[1].length; x++){
              if(matrizFinally[j] === matriz[1][x] && matriz[1][x] !== matriz[1][j]){
                newRowsYellow[1][x] = matriz[1][x];
                break;
              }else{
                newRowsGray[1][x] = matriz[1][x];
              }
            }
          }
        }
  
      setRowsGreen(newRowsGreen);
      setRowsYellow(newRowsYellow);
      setRowsGray(newRowsGray);

      for(let i = 0; i < rowsGreen.length; i++){
        if(rowsGreen[1][i] !== ""){
          isWinner = true;
        }else{
          isWinner = false;
          break;
        }
      }

      if(isWinner){
        setTimeout(() => {
          restartGame();
        },1000);
      }

    }else if(rowThree){
      const newRowsGreen = [...rowsGreen];
      const newRowsYellow = [...rowsYellow];
      const newRowsGray = [...rowsGray];
  
        for (let j = 0; j < matriz[2].length; j++) {
          if (matrizFinally[j] === matriz[2][j]) {
            newRowsGreen[2][j] = matriz[2][j].toString();
          }else{
            for(let x = 0; x < matriz[2].length; x++){
              if(matrizFinally[j] === matriz[2][x] && matriz[2][x] !== matriz[2][j]){
                newRowsYellow[2][x] = matriz[2][x];
                break;
              }else{
                newRowsGray[2][x] = matriz[2][x];
              }
            }
          }
        }
  
      setRowsGreen(newRowsGreen);
      setRowsYellow(newRowsYellow);
      setRowsGray(newRowsGray);
  
      setRowsGreen(newRowsGreen);
      setRowsYellow(newRowsYellow);
      setRowsGray(newRowsGray);

      for(let i = 0; i < rowsGreen.length; i++){
        if(rowsGreen[2][i] !== ""){
          isWinner = true;
        }else{
          isWinner = false;
          break;
        }
      }

      if(isWinner){
        setTimeout(() => {
          restartGame();
        },1000);
      }
      
    }else if(rowFour){
      const newRowsGreen = [...rowsGreen];
      const newRowsYellow = [...rowsYellow];
      const newRowsGray = [...rowsGray];
  
        for (let j = 0; j < matriz[3].length; j++) {
          if (matrizFinally[j] === matriz[3][j]) {
            newRowsGreen[3][j] = matriz[3][j].toString();
          }else{
            for(let x = 0; x < matriz[3].length; x++){
              if(matrizFinally[j] === matriz[3][x] && matriz[3][x] !== matriz[3][j]){
                newRowsYellow[3][x] = matriz[3][x];
                break;
              }else{
                newRowsGray[3][x] = matriz[3][x];
              }
            }
          }
        }
  
      setRowsGreen(newRowsGreen);
      setRowsYellow(newRowsYellow);
      setRowsGray(newRowsGray);
  
      setRowsGreen(newRowsGreen);
      setRowsYellow(newRowsYellow);
      setRowsGray(newRowsGray);

      for(let i = 0; i < rowsGreen.length; i++){
        if(rowsGreen[3][i] !== ""){
          isWinner = true;
        }else{
          isWinner = false;
          break;
        }
      }

      if(isWinner){
        setTimeout(() => {
          restartGame();
        },1000);
      }
      
    }else if(rowFive){
      const newRowsGreen = [...rowsGreen];
      const newRowsYellow = [...rowsYellow];
      const newRowsGray = [...rowsGray];
  
        for (let j = 0; j < matriz[4].length; j++) {
          if (matrizFinally[j] === matriz[4][j]) {
            newRowsGreen[4][j] = matriz[4][j].toString();
          }else{
            for(let x = 0; x < matriz[4].length; x++){
              if(matrizFinally[j] === matriz[4][x] && matriz[4][x] !== matriz[4][j]){
                newRowsYellow[4][x] = matriz[4][x];
                break;
              }else{
                newRowsGray[4][x] = matriz[4][x];
              }
            }
          }
        }
  
      setRowsGreen(newRowsGreen);
      setRowsYellow(newRowsYellow);
      setRowsGray(newRowsGray);
  
      setRowsGreen(newRowsGreen);
      setRowsYellow(newRowsYellow);
      setRowsGray(newRowsGray);

      for(let i = 0; i < rowsGreen.length; i++){
        if(rowsGreen[4][i] !== ""){
          isWinner = true;
        }else{
          isWinner = false;
          break;
        }
      }

      if(isWinner){
        setTimeout(() => {
          restartGame();
        },500);
      }
      
    }

  };

  const images = {
    1: require('../img/food/cookie.png'),
    2: require('../img/food/burger.png'),
    3: require('../img/food/camaron.png'),
    4: require('../img/food/cheese.png'),
    5: require('../img/food/chocolate.png'),
    6: require('../img/food/donuts.png'),
    7: require('../img/food/egg.png'),
    8: require('../img/food/espagueti.png'),
    9: require('../img/food/gelatina.png'),
    10: require('../img/food/hotdog.png'),
  };

  const handleBarsClick = () => {
    navigation.navigate('Bars');
  };

  const handleCogClick = () => {
    navigation.navigate('Settings');
  };

  const handleConfirmClick = () => {
    if(rowOne){
      if(matriz[0][matriz[0].length - 1] != ""){
        setRowOne(false);
        setRowTwo(true);
        verifyIsState();
      }
    }else if(rowTwo){
      if(matriz[1][matriz[1].length - 1] != ""){
        setRowTwo(false);
        setRowThree(true);
        verifyIsState();
      }
    }else if(rowThree){
      if(matriz[2][matriz[2].length - 1] != ""){
        setRowThree(false);
        setRowFour(true);
        verifyIsState();
      }
    }else if(rowFour){
      if(matriz[3][matriz[3].length - 1] != ""){
        setRowFour(false);
        setRowFive(true);
        verifyIsState();
      }
    }else if(rowFive){
      if(matriz[4][matriz[4].length - 1] != ""){
        setRowFive(false);
        verifyIsState();
      }
    }
  };

  const handleSuprClick = () => {
    if (rowOne) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[0].length; i++) {
          if (newMatriz[0][0] === "") {
            break;
          }

          if (newMatriz[0][(newMatriz[0].length - 1) - i] != "") {
            newMatriz[0][(newMatriz[0].length - 1) - i] = "";
            break;
          }
        }
        return newMatriz;
      });
    }else if (rowTwo) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[1].length; i++) {
          if (newMatriz[1][0] === "") {
            break;
          }

          if (newMatriz[1][(newMatriz[1].length - 1) - i] != "") {
            newMatriz[1][(newMatriz[1].length - 1) - i] = "";
            break;
          }
        }
        return newMatriz;
      });
    }else if (rowThree) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[2].length; i++) {
          if (newMatriz[2][0] === "") {
            break;
          }

          if (newMatriz[2][(newMatriz[2].length - 1) - i] != "") {
            newMatriz[2][(newMatriz[2].length - 1) - i] = "";
            break;
          }
        }
        return newMatriz;
      });
    }else if (rowFour) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[3].length; i++) {
          if (newMatriz[3][0] === "") {
            break;
          }

          if (newMatriz[3][(newMatriz[3].length - 1) - i] != "") {
            newMatriz[3][(newMatriz[3].length - 1) - i] = "";
            break;
          }
        }
        return newMatriz;
      });
    }else if (rowFive) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[4].length; i++) {
          if (newMatriz[4][0] === "") {
            break;
          }

          if (newMatriz[4][(newMatriz[4].length - 1) - i] != "") {
            newMatriz[4][(newMatriz[4].length - 1) - i] = "";
            break;
          }
        }
        return newMatriz;
      });
    }
  };

  const handleImageClick = (id: number) => {
    setSelectedImage(id);

    if (rowOne) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[0].length; i++) {
          if (newMatriz[0][newMatriz[0].length - 1] !== "") {
            break;
          }

          if (newMatriz[0][i] === "") {
            newMatriz[0][i] = id.toString();
            break;
          }
        }
        return newMatriz;
      });
    } else if (rowTwo) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[1].length; i++) {
          if (newMatriz[1][newMatriz[1].length - 1] !== "") {
            break;
          }

          if (newMatriz[1][i] === "") {
            newMatriz[1][i] = id.toString();
            break;
          }
        }
        return newMatriz;
      });
    } else if (rowThree) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[2].length; i++) {
          if (newMatriz[2][newMatriz[2].length - 1] !== "") {
            break;
          }

          if (newMatriz[2][i] === "") {
            newMatriz[2][i] = id.toString();
            break;
          }
        }
        return newMatriz;
      });
    } else if (rowFour) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[3].length; i++) {
          if (newMatriz[3][newMatriz[3].length - 1] !== "") {
            break;
          }

          if (newMatriz[3][i] === "") {
            newMatriz[3][i] = id.toString();
            break;
          }
        }
        return newMatriz;
      });
    } else if (rowFive) {
      setMatriz((prevMatriz) => {
        const newMatriz = [...prevMatriz];
        for (let i = 0; i < newMatriz[4].length; i++) {
          if (newMatriz[4][newMatriz[4].length - 1] !== "") {
            break;
          }

          if (newMatriz[4][i] === "") {
            newMatriz[4][i] = id.toString();
            break;
          }
        }
        return newMatriz;
      });
    }
  };

  const selectedStyles = darkMode ? stylesDarkMode : stylesLightMode;

  return (
    <View style={selectedStyles.container}>
      <View style={selectedStyles.contentNav}>
        <TouchableOpacity onPress={handleBarsClick}>
          <Icon style={selectedStyles.iconMI} name="bars" size={width * 0.08} />
        </TouchableOpacity>
        <Text style={selectedStyles.titleContentNav}>FOODLE</Text>
        <TouchableOpacity onPress={handleCogClick}>
          <Icon style={selectedStyles.iconMI} name="cog" size={width * 0.08} />
        </TouchableOpacity>
      </View>

      <View style={selectedStyles.containerGame}>
        {matriz.map((row, rowIndex) => (
          <View style={selectedStyles.rows} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <View
                style={{
                  ...selectedStyles.borderImage,

                  ...(colIndex === 0 && rowsYellow[rowIndex][0] !== "" && { borderColor: 'yellow' }),
                  ...(colIndex === 1 && rowsYellow[rowIndex][1] !== "" && { borderColor: 'yellow' }),
                  ...(colIndex === 2 && rowsYellow[rowIndex][2] !== "" && { borderColor: 'yellow' }),
                  ...(colIndex === 3 && rowsYellow[rowIndex][3] !== "" && { borderColor: 'yellow' }),
                  ...(colIndex === 4 && rowsYellow[rowIndex][4] !== "" && { borderColor: 'yellow' }),

                  ...(colIndex === 0 && rowsGreen[rowIndex][0] !== "" && { borderColor: 'lime' }),
                  ...(colIndex === 1 && rowsGreen[rowIndex][1] !== "" && { borderColor: 'lime' }),
                  ...(colIndex === 2 && rowsGreen[rowIndex][2] !== "" && { borderColor: 'lime' }),
                  ...(colIndex === 3 && rowsGreen[rowIndex][3] !== "" && { borderColor: 'lime' }),
                  ...(colIndex === 4 && rowsGreen[rowIndex][4] !== "" && { borderColor: 'lime' }),


                }}
                key={colIndex}
              >
                <Image
                  source={cell !== "" ? images[parseInt(cell)] : require('../img/nada2.png')}
                  style={selectedStyles.rowImg}
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={selectedStyles.containerBoard}>
        <View style={selectedStyles.rowsBoard}>
          {Array.from({ length: 5 }, (_, rowIndex) => (
            <TouchableOpacity onPress={() => handleImageClick(rowIndex + 1)} data-id='1' key={rowIndex}>
                <View style={{
                  ...selectedStyles.contentBoardImg, 

                  //Obtener valores grises

                  ...(rowsGray[0][0] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[0][1] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[0][2] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[0][3] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[0][4] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  ...(rowsGray[1][0] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[1][1] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[1][2] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[1][3] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[1][4] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  ...(rowsGray[2][0] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[2][1] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[2][2] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[2][3] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[2][4] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  ...(rowsGray[3][0] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[3][1] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[3][2] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[3][3] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[3][4] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  ...(rowsGray[4][0] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[4][1] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[4][2] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[4][3] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[4][4] == (rowIndex + 1).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  //Obtener los valores amarillos

                  ...(rowsYellow[0][0] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[0][1] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[0][2] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[0][3] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[0][4] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),

                  ...(rowsYellow[1][0] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[1][1] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[1][2] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[1][3] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[1][4] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),

                  ...(rowsYellow[2][0] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[2][1] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[2][2] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[2][3] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[2][4] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),

                  ...(rowsYellow[3][0] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[3][1] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[3][2] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[3][3] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[3][4] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),

                  ...(rowsYellow[4][0] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[4][1] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[4][2] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[4][3] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[4][4] == (rowIndex + 1).toString() && {backgroundColor: "yellow"}),

                  //Obtener los valores verdes

                  ...(rowsGreen[0][0] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[0][1] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[0][2] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[0][3] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[0][4] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),

                  ...(rowsGreen[1][0] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[1][1] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[1][2] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[1][3] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[1][4] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),

                  ...(rowsGreen[2][0] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[2][1] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[2][2] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[2][3] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[2][4] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),

                  ...(rowsGreen[3][0] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[3][1] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[3][2] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[3][3] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[3][4] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),

                  ...(rowsGreen[4][0] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[4][1] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[4][2] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[4][3] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[4][4] == (rowIndex + 1).toString() && {backgroundColor: "lime"}),

                }}>
                <Image
                  source={images[rowIndex + 1]}
                  style={selectedStyles.rowImgFinally}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={selectedStyles.rowsBoard}>
          {Array.from({ length: 5 }, (_, rowIndex) => (
            <TouchableOpacity onPress={() => handleImageClick(rowIndex + 6)} data-id='1' key={rowIndex}>
                <View style={{
                  ...selectedStyles.contentBoardImg, 

                  //Obtener valores grises

                  ...(rowsGray[0][0] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[0][1] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[0][2] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[0][3] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[0][4] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  ...(rowsGray[1][0] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[1][1] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[1][2] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[1][3] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[1][4] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  ...(rowsGray[2][0] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[2][1] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[2][2] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[2][3] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[2][4] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  ...(rowsGray[3][0] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[3][1] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[3][2] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[3][3] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[3][4] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  ...(rowsGray[4][0] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[4][1] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[4][2] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[4][3] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),
                  ...(rowsGray[4][4] == (rowIndex + 6).toString() && {backgroundColor: "rgb(65, 68, 88)"}),

                  //Obtener los valores amarillos

                  ...(rowsYellow[0][0] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[0][1] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[0][2] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[0][3] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[0][4] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),

                  ...(rowsYellow[1][0] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[1][1] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[1][2] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[1][3] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[1][4] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),

                  ...(rowsYellow[2][0] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[2][1] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[2][2] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[2][3] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[2][4] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),

                  ...(rowsYellow[3][0] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[3][1] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[3][2] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[3][3] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[3][4] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),

                  ...(rowsYellow[4][0] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[4][1] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[4][2] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[4][3] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),
                  ...(rowsYellow[4][4] == (rowIndex + 6).toString() && {backgroundColor: "yellow"}),

                  //Obtener los valores verdes

                  ...(rowsGreen[0][0] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[0][1] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[0][2] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[0][3] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[0][4] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),

                  ...(rowsGreen[1][0] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[1][1] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[1][2] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[1][3] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[1][4] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),

                  ...(rowsGreen[2][0] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[2][1] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[2][2] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[2][3] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[2][4] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),

                  ...(rowsGreen[3][0] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[3][1] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[3][2] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[3][3] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[3][4] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),

                  ...(rowsGreen[4][0] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[4][1] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[4][2] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[4][3] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),
                  ...(rowsGreen[4][4] == (rowIndex + 6).toString() && {backgroundColor: "lime"}),

                }}>
                <Image
                  source={images[rowIndex + 6]}
                  style={selectedStyles.rowImgFinally}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={selectedStyles.rowsBoardFinally}>
          <TouchableOpacity onPress={handleConfirmClick}>
            <View style={selectedStyles.contentBoardImgFinally}>
              <Image
                source={require('../img/marca-de-verificacion.png')}
                style={selectedStyles.rowImgFinally}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSuprClick}>
            <View style={selectedStyles.contentBoardImgFinally}>
              <Image
                source={require('../img/eliminar.png')}
                style={selectedStyles.rowImgFinally}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContentNav: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    letterSpacing: width * 0.015,
    color: "black",
  },
  containerGame: {
    position: "absolute",
    top: height * 0.16,
    padding: width * 0.02,
    width: "100%",
    height: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    gap: height * 0.01,
  },
  rows: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    paddingTop: 8,
    paddingBottom: 8,
    gap: width * 0.06
  },
  borderImage: {
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 2,
    padding: 8,
    borderRadius: 3
  },
  rowImg: {
    width: 30,
    height: 30
  },
  rowImgFinally: {
    width: 36,
    height: 36
  },
  containerBoard: {
    position: "absolute",
    top: height * 0.7,
    width: "100%",
    height: "auto",
    padding: 10,
    gap: 3,
    display: "flex",
    flexDirection: "column"
  },
  rowsBoard: {
    width: "100%",
    height: "auto",
    padding: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: width * 0.03
  },
  rowsBoardFinally: {
    width: "100%",
    height: "auto",
    padding: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: width * 0.03
  },
  contentBoardImg: {
    width: 60,
    height: 60,
    padding: 5,
    backgroundColor: "rgb(240, 240, 240)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  contentBoardImgFinally:{
    width: 80,
    height: 55,
    padding: 5,
    backgroundColor: "rgb(240, 240, 240)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  iconMI: {
    color: "black"
  }
});

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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContentNav: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    letterSpacing: width * 0.015,
    color: "white"
  },
  containerGame: {
    position: "absolute",
    top: height * 0.16,
    padding: width * 0.02,
    width: "100%",
    height: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    gap: height * 0.01,
  },
  rows: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    paddingTop: 8,
    paddingBottom: 8,
    gap: width * 0.06
  },
  borderImage: {
    borderColor: "rgb(65, 68, 88)",
    borderWidth: 2,
    padding: 8,
    borderRadius: 3
  },
  rowImg: {
    width: 30,
    height: 30
  },
  rowImgFinally: {
    width: 36,
    height: 36
  },
  containerBoard: {
    position: "absolute",
    top: height * 0.7,
    width: "100%",
    height: "auto",
    padding: 10,
    gap: 3,
    display: "flex",
    flexDirection: "column"
  },
  rowsBoard: {
    width: "100%",
    height: "auto",
    padding: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: width * 0.03
  },
  rowsBoardFinally: {
    width: "100%",
    height: "auto",
    padding: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: width * 0.03
  },
  contentBoardImg: {
    width: 60,
    height: 60,
    padding: 5,
    backgroundColor: "rgb(211, 255, 255)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  contentBoardImgFinally:{
    width: 80,
    height: 55,
    padding: 5,
    backgroundColor: "rgb(211, 255, 255)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  iconMI: {
    color: "white"
  }
});


