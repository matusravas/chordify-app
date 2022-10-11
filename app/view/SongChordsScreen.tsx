import React, { useState, useEffect } from 'react';
import { ScrollView, useWindowDimensions } from "react-native"
import axios from 'axios';
import RenderHtml from "react-native-render-html";


const SongChordsScreen = (props: any) => {
    const [data, setData] = useState<any>({ html: ''})
    const song = props.route.params.song
    console.log(song)
    useEffect(() => {
      // fetch('http://chordify-ws.herokuapp.com/api/chords?tab=coldplay/viva-la-vida-chords-675427').then(data=>{
      //       console.log(data)
      //     })
  
      const fetch = async () => {
        console.log('fetching')
        // song?.chords_link?axios.get(`http://10.0.2.2:5000/song/chords?tab=${song.chords_link}`, {
        song?.chords_link?axios.get(`https://chordify-ws.herokuapp.com/api/song/chords?tab=${song.chords_link}`, {
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
      
      <ScrollView style={{ marginBottom: 60, padding: 5}} pinchGestureEnabled={true} zoomScale={5} maximumZoomScale={5} bouncesZoom={true}>
        <RenderHtml
          // tagsStyles={{ b: { color: '#425F57', }, p: {color: '#919090'}}}
          tagsStyles={{ b: { color: '#087EA4', fontSize: 10, fontWeight: 'bold', letterSpacing: '0' }, body: {zIndex: 10}, p: {color: '#F7F7F7AA', fontSize: 10, fontWeight: "100", letterSpacing: '0', includeFontPadding: false, margin: 5, padding: 0 }}}
          contentWidth={width}
          source={data}
        />
      </ScrollView>
      // </SafeAreaView>
    )
  
  }

export default SongChordsScreen