import React, {  } from 'react';
import { FlatList, View } from "react-native"
import { Text } from '@react-native-material/core';
import usePlaylistViewModel from '../view_model/PlaylistViewModel';
import { Playlist } from '../model/domain/types';
import PlaylistCard from './components/PlaylistCard';

interface RenderItemProps {
  item: Playlist,
  index: number
}

const PlaylistsScreen = (props: any) => {
    const {playlists} = usePlaylistViewModel()


    const renderItem = ({item}: RenderItemProps) => (
          <PlaylistCard playlist={item}/>
    )

    return (
        <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={playlists}
            renderItem={renderItem}
            keyExtractor={(item) => item.playlistId.toString()}
            numColumns={3}
        />
      
    )
  }

export default PlaylistsScreen