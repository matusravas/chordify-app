import React, {  } from 'react';
import { FlatList, View } from "react-native"
import { Text } from '@react-native-material/core';
import usePlaylistViewModel from '../view_model/PlaylistViewModel';
import { PlaylistInfo } from '../model/domain/types';

interface RenderItemProps {
  item: PlaylistInfo,
  index: number
}

interface CardProps {
  p: PlaylistInfo
}

const PlaylistsScreen = (props: any) => {
  const {playlists} = usePlaylistViewModel()

  const Card = ({p}: CardProps) => (
    <View style={{flex: 1, justifyContent: 'center', margin: 5, alignItems: 'center', height: 100, backgroundColor: '#ffffff', padding: 10, borderRadius: 5}}>
        <Text variant='body2' color='#000000'>
          Songs {p.songsCount} | Playlist: {p.playlistName} | {(new Date(p.timestampVisit)).toISOString()}
        </Text>
      </View>
  )

const renderItem = ({item, index}: RenderItemProps) => (
      <Card p={item}/>
)
    return (
      // <View></View>
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