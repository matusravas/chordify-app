import React, { memo } from 'react';
import { View, TouchableNativeFeedback, Text } from "react-native"
import { Playlist } from '../../model/domain/types';
import Icon, { Icons } from '../../icons/icons';

interface PlaylistCardModalProps {
  playlist: Playlist,
  onPlaylistSelected: (playlistId: number) => void
}

const PlaylistCardModal = ({ playlist, onPlaylistSelected }: PlaylistCardModalProps) => (
  <TouchableNativeFeedback style={{}} onPress={() => onPlaylistSelected(playlist.id)} background={TouchableNativeFeedback.Ripple('#111317', false)}>
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Icon size={20} type={Icons.MaterialCommunityIcons} name={'playlist-music-outline'} color={'#F7F7F7AA'} />
      <Text style={{ fontSize: 18, margin: 15, fontWeight: '600', color: '#F7F7F7AA'}}>
        {playlist.name}
      </Text>
    </View>
  </TouchableNativeFeedback>
)

export default memo(PlaylistCardModal)