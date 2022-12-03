import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Song } from "../model/domain/types";
import { Action } from "../model/types";
import ChordsScreen from "../view/ChordsScreen";
import ModalMenuScreen from "../view/modals/ModalMenuScreen";
import SongsScreen from "../view/SongsScreen";

export type SongStackParamList = {
  // Songs: {song?: Song, actionType?: ActionType, message?: string},
  Songs: {song?: Song},
  Song: { song: Song, sendDataToParent: (data: Action) => void},
  Modal: { song: Song, sendDataToParent: (data: Action) => void},
}

// const icon = () => <Image source={require('')}/>

const SongStack = createNativeStackNavigator<SongStackParamList>();

const SongStackScreen = () => {
  return (
    // <SongStack.Navigator screenOptions={{ animation: 'slide_from_right', headerShadowVisible: false, statusBarColor: '#1a172d', headerStyle: { backgroundColor: '#1a172d', }, headerTitleStyle: { fontWeight: '400', fontSize: 18 }, headerTintColor: '#F7F7F7AA' }}>
    <SongStack.Navigator id="songs" screenOptions={{ animation: 'slide_from_right', headerShadowVisible: false, statusBarColor: '#0d0f12', headerStyle: { backgroundColor: '#0d0f12', }, headerTitleStyle: { fontWeight: '400', fontSize: 18 }, headerTintColor: '#FFFFFF' }}>
      <SongStack.Screen name="Songs" component={SongsScreen} options={{ headerShown: false }} />
      {/* <SongStack.Screen name="Songs" component={SongsScreen} options={{ headerTitle: (props) => (<SearchBar {...props} />) }}/>   */}
      <SongStack.Screen name="Song" component={ChordsScreen} />

      <SongStack.Screen name="Modal" component={ModalMenuScreen} options={{
        presentation: 'containedTransparentModal',
        // headerTintColor: '#fff',
        // headerTitle: 'Add song to playlist',
        headerStyle: {backgroundColor: "#000000E5"},
        headerTitleStyle: {fontWeight: '500'},
        // headerTitleAlign: 'center',
        // statusBarColor: "#000000E5",
        animation: 'slide_from_bottom',
        contentStyle: { backgroundColor: "#000000E5" },
        // contentStyle: { backgroundColor: "#111317E0" },
        // headerStyle: { backgroundColor: '#ff005d' },
        // headerBackImageSource: icon

      }} />
    </SongStack.Navigator>
    // <SongStack.Navigator screenOptions={{animation: 'slide_from_right', headerShadowVisible: false, statusBarColor: '#1a172d', headerStyle: {backgroundColor: '#1a172d',}, headerTitleStyle: {fontWeight: '400', fontSize: 18}, headerTintColor: '#F7F7F7AA'}}>
    //  <SongStack.Screen name="Songs" component={SongsScreen} options={{headerShown: false}}/>  
    //  {/* <SongStack.Screen name="Songs" component={SongsScreen} options={{ headerTitle: (props) => (<SearchBar {...props} />) }}/>   */}
    //  <SongStack.Screen name="Song" component={ChordsScreen}/>  
    // </SongStack.Navigator>
  );
}

export default SongStackScreen