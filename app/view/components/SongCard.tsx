import React, {  } from 'react';
import { View, TouchableNativeFeedback } from "react-native"
import { HStack, VStack, Text, IconButton } from '@react-native-material/core';
import Icon, { Icons } from '../../icons/icons';
import { SongCardProps } from '../../model/prop_types/types';

const SongCard = ({song, onSongCardClick, onAddToFavoitesButtonClick}: SongCardProps) => {
    return (
      <TouchableNativeFeedback onPress={()=>onSongCardClick} background={TouchableNativeFeedback.Ripple('#425F57', false)}>
        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 10, backgroundColor: '#ffffff', borderRadius: 10, height: 85, marginBottom: 5, marginRight: 5, marginLeft: 5 }}>
          <HStack fill justify='between'>
            <VStack fill={3} justify='between'>
              <Text variant='body1' style={{marginTop: 5}}>
                {song.artist} - {song.name}
              </Text>
              <VStack>
              <Text variant='caption'>
                votes: {song.statistics.votes} | rating: {song.statistics.rating}
              </Text>
              </VStack>
            </VStack>
            <VStack fill style={{alignItems: 'flex-end'}}>
              <IconButton onPress={()=>onAddToFavoitesButtonClick} icon={<Icon type={Icons.MaterialIcons} name='favorite-outline' color='#91909080'/>}/>
            </VStack>
          </HStack>
        </View>
      </TouchableNativeFeedback>
    )
  }

export default SongCard