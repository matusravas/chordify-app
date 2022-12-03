import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Playlist, Song } from "../model/domain/types";
import { Action } from "../model/types";
import ChordsScreen from "../view/ChordsScreen";
import ModalMenuScreen from "../view/modals/ModalMenuScreen";
import PlaylistSongsScreen from "../view/PlaylistSongsScreen";
import PlaylistsScreen from "../view/PlaylistsScreen";

export type PlaylistStackParamList = {
  Playlists: undefined,
  // PlaylistSongs: {playlist: Playlist, song?: Song, actionType?: ActionType, message?: string},
  PlaylistSongs: {playlist: Playlist, song?: Song},
  Song: {song: Song, playlist: Playlist, sendDataToParent: (data: Action) => void},
  Modal: {song: Song, playlist: Playlist, sendDataToParent: (data: Action) => void}
}

const PlaylistStack = createNativeStackNavigator<PlaylistStackParamList>();

const PlaylistStackScreen = () => {
  return (
    // <PlaylistStack.Navigator screenOptions={{animation: 'slide_from_right', headerShadowVisible: true, headerStyle: {backgroundColor: '#201640'}, headerTitleStyle: {fontWeight: '400', fontSize: 18}, headerTintColor: '#F7F7F7AA'}}>
    // <PlaylistStack.Navigator screenOptions={{animation: 'slide_from_right', headerShadowVisible: false, statusBarColor: '#1a172d', headerStyle: {backgroundColor: '#1a172d'}, headerTitleStyle: {fontWeight: '400', fontSize: 18}, headerTintColor: '#F7F7F7AA'}}>
    <PlaylistStack.Navigator id="playlists" screenOptions={{animation: 'slide_from_right', headerShadowVisible: false, statusBarColor: '#0d0f12', headerStyle: {backgroundColor: '#0d0f12'}, headerTitleStyle: {fontWeight: '400', fontSize: 18}, headerTintColor: '#FFFFFF'}}>
     {/* <PlaylistStack.Screen name="Playlists" component={PlaylistsScreen} options={{headerShown: false}}/>   */}
     <PlaylistStack.Screen name="Playlists" component={PlaylistsScreen} options={{headerShown: false}}/>  
     <PlaylistStack.Screen name="PlaylistSongs" component={PlaylistSongsScreen}/>  
     <PlaylistStack.Screen name="Song" component={ChordsScreen}/>  
     <PlaylistStack.Screen name="Modal" component={ModalMenuScreen} options={{
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
    </PlaylistStack.Navigator>
   );
 }

export default PlaylistStackScreen