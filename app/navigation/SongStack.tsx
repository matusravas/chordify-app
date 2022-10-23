import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Song } from "../model/domain/types";
import ChordsScreen from "../view/ChordsScreen";
import SongsScreen from "../view/SongsScreen";
import ModalMenuScreen from "../view/modals/ModalMenuScreen";
import Icon, { Icons } from "../icons/icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from "react-native";

export type SongStackParamList = {
  Songs: undefined,
  Song: { song: Song },
  Modal: { song: Song },
  ModalNewPlaylist: { song: Song },
}

// const icon = () => <Image source={require('')}/>

const SongStack = createNativeStackNavigator<SongStackParamList>();

const SongStackScreen = () => {
  return (
    <SongStack.Navigator screenOptions={{ animation: 'slide_from_right', headerShadowVisible: false, statusBarColor: '#1a172d', headerStyle: { backgroundColor: '#1a172d', }, headerTitleStyle: { fontWeight: '400', fontSize: 18 }, headerTintColor: '#F7F7F7AA' }}>
      <SongStack.Screen name="Songs" component={SongsScreen} options={{ headerShown: false }} />
      {/* <SongStack.Screen name="Songs" component={SongsScreen} options={{ headerTitle: (props) => (<SearchBar {...props} />) }}/>   */}
      <SongStack.Screen name="Song" component={ChordsScreen} />

      <SongStack.Screen name="Modal" component={ModalMenuScreen} options={{
        presentation: 'containedTransparentModal',
        // headerTintColor: '#fff',
        headerTitle: 'Add song to playlist',
        headerStyle: {backgroundColor: "#000000E5"},
        headerTitleAlign: 'center',
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