import React, { memo } from 'react';
import { View, TouchableNativeFeedback } from "react-native"
import { HStack, VStack, Text, IconButton } from '@react-native-material/core';
import Icon, { Icons } from '../../icons/icons';
import { PlaylistCardProps } from '../../model/prop_types/types';
import Platform from '../../platform/Platform';

const PlaylistCard = ({playlist}: PlaylistCardProps) => (
      <TouchableNativeFeedback style={{}} onLongPress={()=>{}} onPress={()=>{}} background={TouchableNativeFeedback.Ripple('#1FC15910', false, Platform.getWidth()/(2.05))}>
     <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 5, backgroundColor: '#0d0f12', borderRadius: 5, height: 100, margin: 5 }}>
            <Text numberOfLines={1} ellipsizeMode='tail' variant='h6' style={{marginTop: 5}} color='#F7F7F7AA'>
              {playlist.playlistName}
            </Text>
            {/* <VStack> */}
            <Text variant='body2' style={{}} color='#F7F7F750'>
              Saved songs: {playlist.songsCount}
            </Text>
            <Text variant='caption' style={{fontSize: 11}} color='#F7F7F750'>
              Last saved song: {new Date(playlist.timestampVisit).toDateString()}
            </Text>
        </View>
      </TouchableNativeFeedback>
)

// export default memo(SongCard)
export default memo(PlaylistCard)//, (prev, next)=>prev.song.id === next.song.id && prev.song.isFavorite !== next.song.isFavorite)
// export default SongCard