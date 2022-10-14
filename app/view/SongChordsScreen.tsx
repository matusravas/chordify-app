import React, { useState, useEffect } from 'react';
import { ScrollView, useWindowDimensions, View, Text } from "react-native"
import axios from 'axios';
import RenderHtml, { Document } from "react-native-render-html";
import Html from "react-native-render-html";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Repository from '../repository/Repository';
import { Song } from '../model/domain/types';

// interface SongChordsScreenProps {

// }


const SongChordsScreen = (props: any) => {
    const repository = Repository.getInstance()
    // const [data, setData] = useState<any>({ html: ''})
    const [chords, setChords] = useState<any>('')
    const [song, setSong] = useState<Song>(props.route.params.song)
    const bottomTabBarHeight = useBottomTabBarHeight()

    useEffect(()=>{
      const getSong = async() => {
        try{
          const data = await repository.searchSong(song)
          if(data.data && data.data.chords){
            setChords(data.data.chords)
          }
        }catch(err){

        }
      }
      getSong()
    }, [])
  
    // useEffect(() => {
      
    // }, [data])
  
    const { width } = useWindowDimensions()
    return (
      // <SafeAreaView style={{marginBottom: 125}}>
      // <View>
      //   <Text style={{color:"#FFFFFF"}}>
      //     {data.html}
      //   </Text>
      // </View>
      <ScrollView 
      
      // automaticallyAdjustContentInsets={true}
      style={{ marginBottom: bottomTabBarHeight, padding: 10}}>
        
        <RenderHtml
          tagsStyles={{ b: { color: '#1FC159'}, body: {color: '#F7F7F7AA', fontSize: 11, margin: 0, padding: 0}}}
          contentWidth={width} 
          source={{html: chords}}
        />
      </ScrollView>

    )
  
  }

export default SongChordsScreen