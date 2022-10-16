import React, { memo } from 'react';
import { View, TouchableNativeFeedback } from "react-native"
import { HStack, VStack, Text, IconButton } from '@react-native-material/core';
import Icon, { Icons } from '../../icons/icons';
import { SongCardProps } from '../../model/prop_types/types';
import Platform from '../../platform/Platform';

const SongCard = ({song, onSongCardClick, onFavoritesButtonClick, onMoreButtonClick}: SongCardProps) => (
      <TouchableNativeFeedback style={{}} onLongPress={()=>{}} onPress={()=>onSongCardClick(song)} background={TouchableNativeFeedback.Ripple('#1FC15910', false, Platform.getWidth()/(2.05))}>
      {/* <TouchableNativeFeedback style={{}} onLongPress={()=>{}} onPress={()=>onSongCardClick(song)} background={TouchableNativeFeedback.Ripple('#087EA4', false, Platform.getWidth()/(2.05))}> */}
        <View style={{paddingLeft: 10, backgroundColor: '#0d0f12', borderRadius: 5, height: 80, marginBottom: 2, marginHorizontal: 2 }}>
          <HStack fill justify='between'> // #F7F7F7
            <VStack fill={4} justify='between' style={{paddingBottom: 10, paddingTop: 10}}>
              <Text numberOfLines={1} ellipsizeMode='tail' variant='body1' style={{marginTop: 5, fontSize: 15}} color='#F7F7F7AA'>
                {song.artist} - {song.name}
              </Text>
              <VStack>
              <Text variant='caption' style={{fontSize: 11}} color='#F7F7F750'>
                votes: {song.votes} | rating: {song.rating}
              </Text>
              </VStack>
            </VStack>
            <HStack fill={1} style={{justifyContent:'flex-end', alignItems: 'center', paddingTop: 2}} >
              <IconButton style={{width: 40}} onPress={()=>onFavoritesButtonClick(song)} icon={<Icon size={20} type={Icons.MaterialIcons} name={song.isFavorite?'favorite':'favorite-outline'} color={song.isFavorite?'#1FC159':'#F7F7F720'}/>}/>
              <IconButton style={{width: 40, margin:4}} onPress={()=>{onMoreButtonClick(song)}} icon={<Icon size={20} type={Icons.MaterialCommunityIcons} name='dots-vertical' color={'#F7F7F720'}/>}/>
            </HStack>
          </HStack>
        </View>
      </TouchableNativeFeedback>
)

// export default memo(SongCard)
export default memo(SongCard)//, (prev, next)=>prev.song.id === next.song.id && prev.song.isFavorite !== next.song.isFavorite)
// export default SongCard