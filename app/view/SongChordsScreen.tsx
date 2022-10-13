import React, { useState, useEffect } from 'react';
import { ScrollView, useWindowDimensions, View, Text } from "react-native"
import axios from 'axios';
import RenderHtml, { Document } from "react-native-render-html";
import Html from "react-native-render-html";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const SongChordsScreen = (props: any) => {
    const [data, setData] = useState<any>({ html: ''})
    const song = props.route.params.song
    const bottomTabBarHeight = useBottomTabBarHeight()
    console.log(song)
    useEffect(() => {
      // fetch('http://chordify-ws.herokuapp.com/api/chords?tab=coldplay/viva-la-vida-chords-675427').then(data=>{
      //       console.log(data)
      //     })
  
      const fetch = async () => {
        console.log('fetching')
        // song?.chords_link?axios.get(`http://10.0.2.2:5000/song/chords?tab=${song.chords_link}`, {
        song?.chordsLink?axios.get(`https://chordify-ws.herokuapp.com/api/song/chords?tab=${song.chordsLink}`, {
          // axios.get('http://10.0.2.2:5000/song/chords', {
          headers: {
            Authorization: '2lpbxtDLNIO4yKgIQOjaJxw8qBzSkbvh'
          }
        }).then(res => {
          // setData((prevState)=>prevState.set({ html: res.data.data.chords}))
          console.log(res.data.data)
          setData({ html: res.data.data.chords })
          // console.log(data) 
        }).catch(err => {
          console.log(err)
        }):null
      }
      fetch()
    }, [])
  
    useEffect(() => {
      
    }, [data])
  
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
          tagsStyles={{ b: { color: '#087EA4'}, body: {color: '#F7F7F7AA', fontSize: 11, margin: 0, padding: 0}}}
          contentWidth={width} 
          source={data}
        />
      </ScrollView>

    )
  
  }

export default SongChordsScreen