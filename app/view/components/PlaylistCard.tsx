import React, { memo } from 'react';
import { View, TouchableNativeFeedback, Text } from "react-native"
import { HStack, VStack, IconButton } from '@react-native-material/core';
import Icon, { Icons } from '../../icons/icons';
import { PlaylistCardProps } from '../../model/prop_types/types';
import Platform from '../../platform/Platform';

const PlaylistCard = ({ playlist, onPlaylistCardClick }: PlaylistCardProps) => (
  <TouchableNativeFeedback style={{}} onPress={() => { onPlaylistCardClick(playlist) }} background={TouchableNativeFeedback.Ripple('#1FC15910', false, Platform.getWidth() / (2.05))}>
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 10, alignItems: 'flex-start', backgroundColor: '#0d0f12', borderRadius: 5, marginBottom: 2 }}>
    {/* <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 10, alignItems: 'flex-start', backgroundColor: '#798c88', borderRadius: 5, marginBottom: 2 }}> */}
      <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 20, fontWeight: '300', color: '#F7F7F7AA', marginBottom: 5}}>
        {playlist.name}
      </Text>
      {/* <View style={{ flex: 1, borderBottomWidth: 1, justifyContent: 'flex-start', borderBottomColor: '#1FC15950', paddingHorizontal: 10, alignSelf: 'stretch', marginTop: 5, marginBottom: 10}}/> */}
      {playlist.id > 0 && <View>
      <Text style={{color: '#F7F7F750', paddingBottom: 5}} >
        {playlist.songsCount} songs
      </Text>
      <Text style={{ fontSize: 11, color: '#F7F7F750' }}>
        Last edit: {new Date(playlist.timestampVisit).toDateString()}
      </Text>
      </View>}
    </View>
  </TouchableNativeFeedback>
)

// export default memo(SongCard)
export default memo(PlaylistCard)//, (prev, next)=>prev.song.id === next.song.id && prev.song.isFavorite !== next.song.isFavorite)
// export default SongCard