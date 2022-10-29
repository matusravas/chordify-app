import React, { memo } from 'react';
import { View, TouchableNativeFeedback, Text } from "react-native"
import { HStack, VStack, IconButton } from '@react-native-material/core';
import Icon, { Icons } from '../../icons/icons';
// import { PlaylistCardProps } from '../../model/prop_types/types';
import Platform from '../../platform/Platform';
import { Playlist } from '../../model/domain/types';


export interface PlaylistCardProps {
  index: number,
  playlist: Playlist,
  onPlaylistCardClick: (playlist: Playlist) => void
}


const PlaylistCard = ({ index, playlist, onPlaylistCardClick }: PlaylistCardProps) => (
  // <TouchableNativeFeedback style={{}} onPress={() => { onPlaylistCardClick(playlist) }} background={TouchableNativeFeedback.Ripple('#1FC15910', false, Platform.getWidth() / (2.05))}>
  <TouchableNativeFeedback style={{}} onPress={() => { onPlaylistCardClick(playlist) }} background={TouchableNativeFeedback.Ripple('#111317', false, Platform.getWidth() / (2.05))}>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, alignItems: 'flex-start', backgroundColor: '#0d0f12', borderRadius: 2, marginBottom: 2, marginHorizontal: 1 }}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 20, fontWeight: '600', color: '#F7F7F7AA', marginBottom: 5 }}>
          {playlist.name}
        </Text>
        <View>
          <Text style={{ color: '#F7F7F750', paddingBottom: 5 }} >
            {playlist.songsCount} songs
          </Text>
          {playlist.timestampEdited ? <Text style={{ fontSize: 11, color: '#F7F7F750' }}>
            Edited {new Date(playlist.timestampEdited).toDateString()}
          </Text> :
            index !== 0? <Text style={{ fontSize: 11, color: '#F7F7F750' }}>
              Created {new Date(playlist.timestampCreated).toDateString()}
            </Text>: null}
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', marginRight: 12 }}>
        <Icon size={20} type={index > 0 ? Icons.Ionicons : Icons.MaterialIcons} name={index > 0 ? 'musical-notes-outline' : 'favorite-outline'} color={'#F7F7F750'} />
      </View>
    </View>
  </TouchableNativeFeedback>
)

// export default memo(SongCard)
export default memo(PlaylistCard)//, (prev, next)=>prev.song.id === next.song.id && prev.song.isFavorite !== next.song.isFavorite)
// export default SongCard