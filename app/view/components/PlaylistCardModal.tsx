import React, { memo } from 'react';
import { View, TouchableNativeFeedback, Text } from "react-native"
import Platform from '../../platform/Platform';
import { Playlist } from '../../model/domain/types';
import Icon, { Icons } from '../../icons/icons';

interface PlaylistCardModalProps {
  playlist: Playlist,
  onPlaylistSelected: (playlistId: number) => void
}

const PlaylistCardModal = ({ playlist, onPlaylistSelected }: PlaylistCardModalProps) => (
  <TouchableNativeFeedback style={{}} onPress={() => onPlaylistSelected(playlist.id)} background={TouchableNativeFeedback.Ripple('#111317', false, Platform.getWidth() / (2.05))}>

    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5, borderBottomWidth: 0.2, borderColor: '#1FC159CC', margin: 8 }}>
      {/* <View style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-start'}}> */}
      {/* <Icon size={17} type={Icons.Ionicons} name='ios-musical-notes-outline' color={'#F7F7F7AA'} /> */}

      <Text numberOfLines={1} ellipsizeMode='tail' style={{marginLeft: 8, fontSize: 20, fontWeight: '500', color: '#F7F7F7AA' }}>
        {playlist.name}
      </Text>
      {/* <View style={{flex: 3.5, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-end'}}>
        <Icon size={17} type={Icons.Ionicons} name='ios-musical-notes-outline' color={'#F7F7F7AA'} />
        </View>
        <View style={{flex: 5, justifyContent: 'flex-start', marginLeft: 5}}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 20, fontWeight: '500', color: '#F7F7F7AA'}}>
          {playlist.name}
        </Text>
        </View> */}
      {/* </View> */}
    </View>
  </TouchableNativeFeedback>
)

export default memo(PlaylistCardModal)