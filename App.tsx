import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import axios from "axios"
import { useEffect, useState } from "react"
import RenderHtml from "react-native-render-html";
import { NavigationContainer } from '@react-navigation/native';
import BottomBar from "./app/navigation/BottomBar";
import { Searchbar, Surface } from "react-native-paper";
import { AppBar } from '@react-native-material/core';


const App = () => {
  return (
    // <SafeAreaView>
    //   <StatusBar 
    //   hidden={true}
    //   />
    // <Surface elevation={4} style={{paddingVertical: 90}}>
      <NavigationContainer>
        <BottomBar />
      </NavigationContainer>
    // </Surface>
  
      
      
      // </Surface>
    // </SafeAreaView>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc"
  },
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.5,
    elevation: 5
  }
})

export default App