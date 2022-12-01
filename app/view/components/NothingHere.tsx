import React, {  } from 'react';
import { View } from "react-native"
import { Text } from '@react-native-material/core';


const NothingHere = () => {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text variant='body1' color='#F7F7F7'>
          There's nothing here
        </Text>
        <Text variant='body1' color='#F7F7F7' style={{marginTop: 5}}>
        ¯\\_(ツ)_/¯  
        </Text>
      </View> 
    )
  }

export default NothingHere