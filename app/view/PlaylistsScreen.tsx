import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from "react-native";
import { Playlist } from '../model/domain/types';
import { PlaylistsScreenProps } from '../navigation/types';
import usePlaylistViewModel from '../view_model/PlaylistViewModel';
import PlaylistCard from './components/PlaylistCard';

interface RenderItemProps {
  item: Playlist,
  index: number
}


const PlaylistsScreen = ({navigation}: PlaylistsScreenProps) => {
    const {playlists, searchPlaylists} = usePlaylistViewModel()
    const bottomTabBarHeight = useBottomTabBarHeight()
    
    // const renderItem = ({item}: RenderItemProps) => (
    //       <PlaylistCard playlist={item} onPlaylistCardClick={handlePlaylistCardClick}/>
    // )

    useFocusEffect(
      useCallback(()=>{
        searchPlaylists()
      }, [])
      // searchPlaylists()
    ) 

    // useEffect(()=> {
      
    // }, [navigation])

    const handlePlaylistCardClick = useCallback((playlist: Playlist) => {
      console.log(playlist)
      navigation.navigate('PlaylistSongs', {playlist: playlist})
    }, [])

    return (
        <FlatList
        style={{paddingVertical: 5, paddingHorizontal: 1, marginBottom: bottomTabBarHeight}}
            contentContainerStyle={{ flexGrow: 1 }}
            data={playlists}
            renderItem={({index, item: playlist}: RenderItemProps) => <PlaylistCard index={index} playlist={playlist} onPlaylistCardClick={handlePlaylistCardClick}/>}
            keyExtractor={(item) => item.id.toString()}
            // numColumns={2}
        />
    )
  }

export default PlaylistsScreen