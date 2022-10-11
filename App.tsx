import { Dimensions, SafeAreaView, StyleSheet } from "react-native"
import { useState } from "react"
import Platform from "./app/platform/Platform";
import SongsScreen from "./app/view/SongsScreen";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./app/navigation/Router";


const App = () => {
  const [isPortrait, setIsPortrait] = useState(true)
  Dimensions.addEventListener('change', ()=>{
    setIsPortrait(Platform.isPortrait)
  })
  // console.log(isPortrait)
  return (
    // <SafeAreaView style={{backgroundColor:'#23262E'}}>
      <NavigationContainer>
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