import React, { memo } from 'react';
import { View, TouchableNativeFeedback, Text } from "react-native"
import Platform from '../../platform/Platform';
import { Playlist } from '../../model/domain/types';

interface PlaylistCardModalProps {
  playlist: Playlist,
  onPlaylistSelected: (playlist: Playlist) => void
}

const PlaylistCardModal = ({ playlist, onPlaylistSelected }: PlaylistCardModalProps) => (
  <TouchableNativeFeedback style={{}} onPress={() => onPlaylistSelected(playlist)} background={TouchableNativeFeedback.Ripple('#1FC15910', false, Platform.getWidth() / (2.05))}>

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text numberOfLines={1} ellipsizeMode='tail' style={{ padding: 10, fontSize: 20, fontWeight: '500', color: '#F7F7F7AA', marginBottom: 5 }}>
        {playlist.name}
      </Text>
    </View>
  </TouchableNativeFeedback>
)

export default memo(PlaylistCardModal)