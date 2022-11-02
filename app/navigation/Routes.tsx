import React, { FC } from 'react';
import { StyleSheet } from "react-native"
import { Icons } from '../res/icons/icons';
import PlaylistsScreen from '../view/PlaylistsScreen';
import PlaylistStackScreen from './PlaylistStack';
import SongStackScreen from './SongStack';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff"
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
  },
  searchBar: {
    // borderRadius: 15, 
    // height: 60, 
    // position: 'absolute',
    // top: 5,
    // left: 10,
    // right: 10,
    // marginHorizontal: 5,
    // marginTop: 5,
    elevation: 0
  },
})


type Screen = {
  component: FC<any>,
  name: string,
  label: string,
  iconFocused: string
  iconType: any
  iconNotFocused: string,
}

const routes: Array<Screen> = [
  {
    component: SongStackScreen,
    name: 'Search',
    label: 'Search',
    iconType: Icons.MaterialIcons,
    iconFocused: 'search',
    iconNotFocused: 'search',
  },
  {
    component: PlaylistStackScreen,
    name: 'Library',
    label: 'Your Library',
    iconType: Icons.MaterialIcons,
    iconFocused: 'library-music',
    iconNotFocused: 'library-music',
  },
]

export default routes