import { Dimensions, SafeAreaView, StyleSheet } from "react-native"
import { useState } from "react"
import Platform from "./app/platform/Platform";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Router from "./app/navigation/Router";
// import NetInfo from "@react-native-community/netinfo";

// const unsubscribe = NetInfo.addEventListener(state => {
//   console.log("Connection type", state.type);
//   console.log("Is connected?", state.isConnected);
// });


const App = () => {
  const [isPortrait, setIsPortrait] = useState(true)
  Dimensions.addEventListener('change', ()=>{
    setIsPortrait(Platform.isPortrait)
  })
  console.log(DefaultTheme.colors)
  return (
    // <SafeAreaView style={{backgroundColor:'#23262E'}}>
      <NavigationContainer theme={{
        dark: true,
        colors: {
          ...DefaultTheme.colors,
          background: '#111317',
          card: '#111317'
          // Todo set whatever colors you want
        },
      }}>
        <Router />
      </NavigationContainer>
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