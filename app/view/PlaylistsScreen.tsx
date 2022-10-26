import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from "react-native"
import { Text } from '@react-native-material/core';
import usePlaylistViewModel from '../view_model/PlaylistViewModel';
import { Playlist } from '../model/domain/types';
import PlaylistCard from './components/PlaylistCard';
import useSongListViewModel from '../view_model/SongListViewModel';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlaylistStackParamList } from '../navigation/PlaylistStack';
import { PlaylistsScreenProps } from '../navigation/types';

interface RenderItemProps {
  item: Playlist,
  index: number
}


const PlaylistsScreen = ({navigation}: PlaylistsScreenProps) => {
    const {playlists, searchPlaylists} = usePlaylistViewModel()
    
    // const renderItem = ({item}: RenderItemProps) => (
    //       <PlaylistCard playlist={item} onPlaylistCardClick={handlePlaylistCardClick}/>
    // )

    useFocusEffect(()=>{
      searchPlaylists()
    })

    // useEffect(()=> {
      
    // }, [navigation])

    const handlePlaylistCardClick = useCallback((playlist: Playlist) => {
      console.log(playlist)
      navigation.navigate('PlaylistSongs', {playlist: playlist})
    }, [])

    return (
        <FlatList
        style={{paddingVertical: 5, paddingHorizontal: 1}}
            contentContainerStyle={{ flexGrow: 1 }}
            data={playlists}
            renderItem={({index, item: playlist}: RenderItemProps) => <PlaylistCard index={index} playlist={playlist} onPlaylistCardClick={handlePlaylistCardClick}/>}
            keyExtractor={(item) => item.id.toString()}
            // numColumns={2}
        />
    )
  }

export default PlaylistsScreen