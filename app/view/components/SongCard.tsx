import React, { memo } from 'react';
import { View, TouchableNativeFeedback } from "react-native"
import { HStack, VStack, Text, IconButton } from '@react-native-material/core';
import Icon, { Icons } from '../../icons/icons';
import { SongCardProps } from '../../model/prop_types/types';
import Platform from '../../platform/Platform';

const SongCard = ({song, onSongCardClick, onAddToFavoitesButtonClick}: SongCardProps) => (
      <TouchableNativeFeedback style={{}} onLongPress={()=>{}} onPress={()=>onSongCardClick(song)} background={TouchableNativeFeedback.Ripple('#087EA410', false, Platform.getWidth()/(2.05))}>
      {/* <TouchableNativeFeedback style={{}} onLongPress={()=>{}} onPress={()=>onSongCardClick(song)} background={TouchableNativeFeedback.Ripple('#087EA4', false, Platform.getWidth()/(2.05))}> */}
        <View style={{ paddingBottom: 10, paddingLeft: 10, backgroundColor: '#0d0f12', borderRadius: 8, height: 85, marginBottom: 2, marginHorizontal: 3 }}>
          <HStack fill justify='between'> // #F7F7F7
            <VStack fill={3} justify='between' style={{paddingTop: 10}}>
              <Text variant='body1' style={{marginTop: 5, fontSize: 15}} color='#F7F7F7AA'>
                {song.artist} - {song.name}
              </Text>
              <VStack>
              <Text variant='caption' style={{fontSize: 11}} color='#F7F7F750'>
                votes: {song.statistics.votes} | rating: {song.statistics.rating}
              </Text>
              </VStack>
            </VStack>
            <VStack fill style={{alignItems: 'flex-end', paddingTop: 2}} >
              <IconButton onPress={()=>onAddToFavoitesButtonClick(song)} icon={<Icon type={Icons.MaterialIcons} name='favorite-outline' color='#F7F7F720'/>}/>
            </VStack>
          </HStack>
        </View>
      </TouchableNativeFeedback>
)

// export default memo(SongCard)
export default memo(SongCard, (prev, next)=>prev.song.id === next.song.id)
// export default SongCard