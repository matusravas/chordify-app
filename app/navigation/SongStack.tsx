import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SongChordsScreen from "../view/SongChordsScreen";
import SongsScreen from "../view/SongsScreen";

const SongStack = createNativeStackNavigator();

const SongStackScreen = () => {
  return (
    <SongStack.Navigator screenOptions={{headerShown: false, contentStyle: {backgroundColor: '#23262E'}}}>
     <SongStack.Screen name="Songs" component={SongsScreen} />  
     <SongStack.Screen name="Song" component={SongChordsScreen} />  
    </SongStack.Navigator>
   );
 }

export default SongStackScreen