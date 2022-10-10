import React, { FC, useState, useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View, TouchableOpacity, TouchableNativeFeedback } from "react-native"
import axios from 'axios';
// import Icon from 'react-native-vector-icons'

import RenderHtml from "react-native-render-html";
import { HStack, VStack, Text, Button, Snackbar, TextInput, Chip, IconButton } from '@react-native-material/core';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Icon, { Icons } from '../icons/icons';

interface Song {
  artist: string, song: string, statistics: { votes: number, rating: number }
}

interface CardProps {
  song: Song,
  // onClick: (song: Song)=>{}
  onClick: ()=>{}
}

const MySnack = () => (
  <Snackbar
    message="Note archived."
    action={<Button variant="text" title="Dismiss" color="#BB86FC" compact />}
  // style={{ position: "absolute", start: 16, end: 16, bottom: 100 }}
  />
)

// const Card = (s: any, onClick: (song: Song)=>void) => {
const Card = ({song, onClick}: CardProps) => {
  // console.log(song)
  // let song = s.song
  return (
    <TouchableNativeFeedback onPress={onClick} background={TouchableNativeFeedback.Ripple('#425F57', false)}>
      <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 10, backgroundColor: '#ffffff', borderRadius: 10, height: 85, marginBottom: 5, marginRight: 5, marginLeft: 5 }}>
        <HStack fill justify='between'>
          <VStack fill={3} justify='between'>
            <Text variant='body1' style={{marginTop: 5}}>
              {song.artist} - {song.song}
            </Text>
            <VStack>
            <Text variant='caption'>
              votes: {song.statistics.votes} | rating: {song.statistics.rating}
            </Text>
            </VStack>
          </VStack>
          <VStack fill style={{alignItems: 'flex-end'}}>
            <IconButton onPress={()=><MySnack/>} icon={<Icon type={Icons.MaterialIcons} name='favorite-outline' color='#91909080'/>}/>
            
          </VStack>
        </HStack>
      </View>
    </TouchableNativeFeedback>
  )
}


const SearchBar = ({setData}: any) =>{
  const [searchQuery, setSearchQuery] = React.useState('');
  const [lastSearchQuery, setLastSearchQuery] = React.useState('');
  const [timeoutToken, setTimeoutToken] = React.useState(0);
  const isMounted = useRef(false)
  // console.log(searchQuery)
  let token = 0

  const filterResults = async () =>{
    console.log('searching - ' + searchQuery)
    axios.get(`https://chordify-ws.herokuapp.com/api/songs?query=${searchQuery}&type=300&sort=desc`, {
        headers: {
          Authorization: '2lpbxtDLNIO4yKgIQOjaJxw8qBzSkbvh'
        }
      }).then(res => {
        setData(res.data.data)
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (isMounted.current && searchQuery !== lastSearchQuery) {
      setLastSearchQuery(searchQuery)
      const token = setTimeout(() => {
        console.log(searchQuery)
        filterResults()
      }, 1000)
      return () => clearTimeout(token)
    }
    isMounted.current = true
  }, [searchQuery])

  // const handleSearchQueryChanged = (query: string) => {
  //   console.log(query)
  //   // console.log(timeoutToken)
  //   clearTimeout(token)
  //   setTimeoutToken(token)
  //   setSearchQuery(query)
    
  //   token = setTimeout(filterResults, 1000)
    
  // }

  return (
    <TextInput 
    style={{padding: 10}}
    leading={<Icon type={Icons.MaterialIcons} name='search' color="#425F57"/>} 
    trailing={searchQuery?<IconButton onPress={()=>setSearchQuery("")} icon={<Icon type={Icons.MaterialIcons} name='clear' color="#425F57"/>}/>:null} 
    color='#425F57' 
    placeholder='Search your favorite song...' 
    textAlignVertical='bottom' variant='standard' 
    value={searchQuery} onChangeText={(text)=>setSearchQuery(text)}/>
    )
}

interface NavigationProps {
  name: String,
  params: Object
}

const SongsScreen = () => {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation<any>();
  useEffect(() => {
    
    const fetch = async () => {
      setIsLoading(true)
      console.log('fetching')
      // axios.get('localhost:5000/chords?tab=coldplay/viva-la-vida-chords-675427', {
      // axios.get('http://10.0.2.2:5000/songs', {
      axios.get('https://chordify-ws.herokuapp.com/api/songs', {
        headers: {
          Authorization: '2lpbxtDLNIO4yKgIQOjaJxw8qBzSkbvh'
        }
      }).then(res => {
        setData(res.data.data)
        // console.log(res.data.data)
        // console.log(data) 
      }).catch(err => {
        console.log(err)
      })
    }
    fetch()
    setIsLoading(false)
  }, [])

  console.log(`size of datat list ${data.length}`)
  const onChangeSearch = (query: string) => setSearchQuery(query);
  
  const handleItemClick = (song: Song) => {
    navigation.navigate('Song', {song: song})
    // console.log(song)
  }
  //@ts-ignore
  const renderItem = ({ item }) => {
    // console.log(item)
    return (
      // @ts-ignore
      // <View></View>
      <Card song={item} onClick={() => handleItemClick(item)} />
      //   <Card style={{marginBottom: 5, marginRight: 5, marginLeft: 5, height: 100, borderRadius: 10}}>
      //   <Card.Content>
      //     <Title>{item.artist} - {item.song}</Title>
      //     <Paragraph>votes: {item.statistics.votes} rating: {item.statistics.rating}</Paragraph>
      //   </Card.Content>
      // </Card>
    )
  }

  return (
    <SafeAreaView>
      {/* {!isLoading && <MySnack/>} */}
      {/* <Surface elevation={4} style={{paddingTop: 60}}> */}
      {/* <Searchbar
      // icon={()=><Icon name='home'/>}
      style={{...styles.searchBar}}
      // placeholder="Search"
      onChangeText={onChangeSearch}
      // loading={false}
      value={searchQuery}
    /> */}
      <SearchBar setData={setData} />
      <FlatList
        style={{ marginBottom: 125 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* </Surface> */}
    </SafeAreaView>
  );
};

const HomeScreen = (props: any) => {

  return (
    // <VStack fill justify='center'>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text variant='body2'>
        Coming soon...
      </Text>
    </View>
    // </VStack>
    
  )
}


const SongStack = createNativeStackNavigator();

export const SongStackScreen = () => {
  return (
    <SongStack.Navigator screenOptions={{headerShown: false}}>
     <SongStack.Screen name="Songs" component={SongsScreen} />  
     <SongStack.Screen name="Song" component={SongChordsScreen} />  
    </SongStack.Navigator>
   );
 }


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
      song?.chords_link?axios.get(`https://chordify-ws.herokuapp.com/api/song/chords?tab=${song.chords_link}`, {
        // axios.get('http://10.0.2.2:5000/song/chords', {
        headers: {
          Authorization: '2lpbxtDLNIO4yKgIQOjaJxw8qBzSkbvh'
        }
      }).then(res => {
        // setData((prevState)=>prevState.set({ html: res.data.data.chords}))
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff"
  },
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.5,
    elevation: 5
  },
  searchBar: {
    // borderRadius: 15, 
    // height: 60, 
    // position: 'absolute',
    // top: 5,
    // left: 10,
    // right: 10,
    // marginHorizontal: 5,
    // marginTop: 5,
    elevation: 0
  },
})


type Screen = {
  component: FC<any>,
  name: string,
  label: string,
  iconFocused: string
  iconType: any
  iconNotFocused: string,
}

const tabs: Array<Screen> = [
  {
    component: SongStackScreen,
    name: 'Search',
    label: 'Search',
    iconType: Icons.MaterialIcons,
    iconFocused: 'search',
    iconNotFocused: 'search',
  },
  {
    component: HomeScreen,
    name: 'Home',
    label: 'Home',
    iconType: Icons.MaterialIcons,
    iconFocused: 'music-note',
    iconNotFocused: 'music-note',
  },
]

export default tabs