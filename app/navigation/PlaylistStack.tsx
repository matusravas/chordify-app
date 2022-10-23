import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Playlist, Song } from "../model/domain/types";
import PlaylistsScreen from "../view/PlaylistsScreen";
import PlaylistSongsScreen from "../view/PlaylistSongsScreen";
import ChordsScreen from "../view/ChordsScreen";

export type PlaylistStackParamList = {
  Playlists: undefined,
  PlaylistSongs: {playlist: Playlist},
  Song: {song: Song}
}

const PlaylistStack = createNativeStackNavigator<PlaylistStackParamList>();

const PlaylistStackScreen = () => {
  return (
    // <PlaylistStack.Navigator screenOptions={{animation: 'slide_from_right', headerShadowVisible: true, headerStyle: {backgroundColor: '#201640'}, headerTitleStyle: {fontWeight: '400', fontSize: 18}, headerTintColor: '#F7F7F7AA'}}>
    <PlaylistStack.Navigator screenOptions={{animation: 'slide_from_right', headerShadowVisible: false, statusBarColor: '#1a172d', headerStyle: {backgroundColor: '#1a172d'}, headerTitleStyle: {fontWeight: '400', fontSize: 18}, headerTintColor: '#F7F7F7AA'}}>
     {/* <PlaylistStack.Screen name="Playlists" component={PlaylistsScreen} options={{headerShown: false}}/>   */}
     <PlaylistStack.Screen name="Playlists" component={PlaylistsScreen} options={{headerShown: false}}/>  
     <PlaylistStack.Screen name="PlaylistSongs" component={PlaylistSongsScreen}/>  
     <PlaylistStack.Screen name="Song" component={ChordsScreen}/>  
    </PlaylistStack.Navigator>
   );
 }

export default PlaylistStackScreen