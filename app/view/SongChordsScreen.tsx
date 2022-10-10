import React, { useState, useEffect } from 'react';
import { ScrollView, useWindowDimensions } from "react-native"
import axios from 'axios';
import RenderHtml from "react-native-render-html";


const SongChordsScreen = (props: any) => {
    const [data, setData] = useState<any>({ html: '', etc: {capo: '', tuning: ''} })
    const song = props.route.params.song
    console.log(song)
    useEffect(() => {
      // fetch('http://chordify-ws.herokuapp.com/api/chords?tab=coldplay/viva-la-vida-chords-675427').then(data=>{
      //       console.log(data)
      //     })
  
      const fetch = async () => {
        console.log('fetching')
        song?.chords_link?axios.get(`http://10.0.2.2:5000/song/chords?tab=${song.chords_link}`, {
        // song?.chords_link?axios.get(`https://chordify-ws.herokuapp.com/api/song/chords?tab=${song.chords_link}`, {
          // axios.get('http://10.0.2.2:5000/song/chords', {
          headers: {
            Authorization: '2lpbxtDLNIO4yKgIQOjaJxw8qBzSkbvh'
          }
        }).then(res => {
          // setData((prevState)=>prevState.set({ html: res.data.data.chords}))
          console.log(res.data.data)
          setData({ html: res.data.data })
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
      
      <ScrollView style={{...styles.container, marginBottom: 60}}>
        <RenderHtml
          // tagsStyles={{ b: { color: '#425F57', }, p: {color: '#919090'}}}
          tagsStyles={{ b: { color: '#425F57', }, p: {color: '#000000'}}}
          contentWidth={width}
          source={data}
        />
      </ScrollView>
      // </SafeAreaView>
    )
  
  }

export default SongChordsScreen