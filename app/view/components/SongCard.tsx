import React, { memo } from 'react';
import { View, TouchableNativeFeedback } from "react-native"
import { HStack, VStack, Text, IconButton } from '@react-native-material/core';
import Icon, { Icons } from '../../icons/icons';
import { SongCardProps } from '../../model/prop_types/types';
import Platform from '../../platform/Platform';

const SongCard = ({song, onSongCardClick, onAddToFavoitesButtonClick}: SongCardProps) => {
    return (
      <TouchableNativeFeedback style={{}} onLongPress={()=>onSongCardClick(song)} onPress={()=>onSongCardClick(song)} background={TouchableNativeFeedback.Ripple('#087EA4', false, Platform.getWidth()/(2.1))}>
        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 10, backgroundColor: '#353A4750', borderStyle: 'solid', borderWidth: 0.5, borderColor: '#087EA460', borderRadius: 10, height: 85, marginBottom: 5, marginRight: 5, marginLeft: 5 }}>
          <HStack fill justify='between'> // #F7F7F7
            <VStack fill={3} justify='between'>
              <Text variant='body1' style={{marginTop: 5}} color='#F7F7F7AA'>
                {song.artist} - {song.name}
              </Text>
              <VStack>
              <Text variant='caption' color='#F7F7F750'>
                votes: {song.statistics.votes} | rating: {song.statistics.rating}
              </Text>
              </VStack>
            </VStack>
            <VStack fill style={{alignItems: 'flex-end'}}>
              <IconButton onPress={()=>onAddToFavoitesButtonClick(song)} icon={<Icon type={Icons.MaterialIcons} name='favorite-outline' color='#F7F7F750'/>}/>
            </VStack>
          </HStack>
        </View>
      </TouchableNativeFeedback>
    )
  }

// export default memo(SongCard)
export default memo(SongCard, (prev, next)=>prev.song.id === next.song.id)
// export default SongCard