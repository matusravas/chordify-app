import React, { useState, useEffect, useMemo, memo } from 'react';
import { ScrollView, useWindowDimensions, View, Text } from "react-native"
import axios from 'axios';
import RenderHtml, { Document } from "react-native-render-html";
import Html from "react-native-render-html";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Repository from '../repository/Repository';
import { Song } from '../model/domain/types';
import { useNavigation } from '@react-navigation/native';

// interface SongChordsScreenProps {

// }


const styles = {html: { b: { color: '#1FC159'}, body: {color: '#F7F7F7AA', fontSize: 11, margin: 0, padding: 0}}}


const SongChordsScreen = (props: any) => {
    const repository = Repository.getInstance()
    // const [data, setData] = useState<any>({ html: ''})
    const [chords, setChords] = useState<any>('')
    const [html, setHtml] = useState<any>({html: ''})
    const [song, setSong] = useState<Song>(props.route.params.song)
    const bottomTabBarHeight = useBottomTabBarHeight()
    const { width } = useWindowDimensions()
    // const navigation = useNavigation()
    // Todo on back pressed pop it from stack
    console.log('Chords rerender')

    useEffect(()=>{
      const getSong = async() => {
        try{
          const data = await repository.searchSong(song)
          if(data.data && data.data.chords){
            // setChords(data.data.chords)
            setHtml({html: data.data.chords})
          }
        }catch(err){

        }
      }
      getSong()
    }, [])
  
    // useEffect(() => {
      
    // }, [data])
    
    return (
      // <SafeAreaView style={{marginBottom: 125}}>
      // <View>
      //   <Text style={{color:"#FFFFFF"}}>
      //     {data.html}
      //   </Text>
      // </View>
      <ScrollView 
      
      // automaticallyAdjustContentInsets={true}
      // Todo 
      // ! https://stackoverflow.com/questions/68966120/react-native-render-html-you-seem-to-update-the-x-prop-of-the-y-component-in-s
       
      style={{ marginBottom: bottomTabBarHeight, padding: 10}}>
         {html.html && <RenderHtml
          tagsStyles={styles.html}
          contentWidth={width} 
          source={html}
        />}
      </ScrollView>

    )
  
  }

export default memo(SongChordsScreen)
// export default memo(SongChordsScreen, (prev, next)=>prev.props.route.params.song.id === next.props.route.params.song.id)
// export default memo(SongChordsScreen, (prev, next)=>true)