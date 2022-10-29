import React, { memo } from 'react';
import { View, TouchableNativeFeedback, Text } from "react-native"
import { HStack, VStack, IconButton } from '@react-native-material/core';
import Icon, { Icons } from '../../icons/icons';
// import { SongCardProps } from '../../model/prop_types/types';
import Platform from '../../platform/Platform';
import { Song } from '../../model/domain/types';


export interface SongCardProps {
  // index: number,
  song: Song,
  onSongCardClick: (song: Song) => void
  onFavoritesButtonClick: (song: Song) => void,
  onMoreButtonClick: (song: Song) => void
}


const SongCard = ({song, onSongCardClick, onFavoritesButtonClick, onMoreButtonClick}: SongCardProps) => (
      // <TouchableNativeFeedback style={{}} onLongPress={()=>{}} onPress={()=>onSongCardClick(song)} background={TouchableNativeFeedback.Ripple('#1FC15910', false, Platform.getWidth()/(2.05))}>
      <TouchableNativeFeedback style={{}} onLongPress={()=>{}} onPress={()=>onSongCardClick(song)} background={TouchableNativeFeedback.Ripple('#111317', false, Platform.getWidth()/(2.05))}>
      {/* <TouchableNativeFeedback style={{}} onLongPress={()=>{}} onPress={()=>onSongCardClick(song)} background={TouchableNativeFeedback.Ripple('#087EA4', false, Platform.getWidth()/(2.05))}> */}
        {/* <View style={{paddingLeft: 10, backgroundColor: index%2===0?'#0d0f12': '#0d0f1220', borderRadius: 5, height: 80, marginBottom: 2, marginHorizontal: 2 }}> */}
        <View style={{paddingLeft: 10, backgroundColor: '#0d0f12', borderRadius: 5, height: 80, marginBottom: 2, marginHorizontal: 1 }}>
          <HStack fill justify='between'> // #F7F7F7
            <VStack fill={4} justify='between' style={{paddingBottom: 10, paddingTop: 10}}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={{marginTop: 5, fontSize: 16, fontWeight: '500', color: '#F7F7F7AA'}}>
                {song.artist} - {song.name}
              </Text>
              <VStack>
              <Text style={{fontSize: 11, color: '#F7F7F750'}}>
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

export default memo(SongCard)
// export default memo(SongCard, (prev, next)=>prev.song.id === next.song.id && prev.song.isFavorite === next.song.isFavorite)
// export default SongCard