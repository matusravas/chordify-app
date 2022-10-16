import { useNavigation, useTheme } from '@react-navigation/native';
import useSongListViewModel from '../view_model/SongListViewModel';
import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import {View, FlatList} from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Snackbar, Box, Button } from '@react-native-material/core';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffectAfterMount } from '../utils/hooks';


const SongsScreen = () => {
    // const [songs, searchQuery, currentPage, setSearchQuery, handleAddToPlaylist] = useSongListViewModel()
    const {songs, searchQuery, currentPage, isLoading, setSearchQuery, searchSongs, handleFavoritesChange} = useSongListViewModel()
    const bottomTabBarHeight = useBottomTabBarHeight()
    const [showSnack, setShowSnack] = useState(true)
    const navigation = useNavigation<any>();
    const {isConnected} = useNetInfo()
    const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
    console.log('SongsScreen rerender')
    // console.log(isOnline)
    const theme = useTheme()
    // NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    // });
    // const handleCardClick = useCallback((song: Song) => {
    //   console.log(song)
    //   navigation.navigate('Song', {song: song})
    // },[])

    // const handleAddToFavorites = useCallback((song: Song) => {
    //   console.log(song)
    // },[])

    useEffectAfterMount(()=>{
      // if(isConnected) 
      searchSongs()
    }, [isConnected])

    const handleCardClick = useCallback((song: Song) => {
      console.log(song)
      navigation.navigate('Song', {song: song})
    },[])

    // const handleAddToFavorites = (song: Song) => {
    //   console.log(song)
    // }
    
    const handlePageChanged = useCallback(() => {
      console.log(`Page change: current page: ${currentPage} + 1` )
      // setCurrentPage(currentPage+1)
      // navigation.navigate('Song', {song: song})
    },[])
    
    const handleSearch = useCallback((query: string) => {
      // console.log(`handling search ${query}`)
      setSearchQuery(query)
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 })
    },[])
    
    const handleScrollPositionChange = ()=>{
        // Todo when search is performed scroll to the top of the lis
    }
  
    return (
      <View style={{flex: 1, marginBottom: bottomTabBarHeight}}>
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
        {isLoading && <ActivityIndicator style={{marginTop: 10}} size="large" color='#1FC159'/>}
        <SongsList 
              flatListRef={flatListRef}
              isFetched={!isLoading}
              songs={songs} 
              onCardClick={handleCardClick} 
              onFavoritesButtonClick={handleFavoritesChange}
              onPageChanged={handlePageChanged}
              />
        {(!isConnected && showSnack) &&<Box >
          <Snackbar  action={<Button variant="text" title="Dismiss" color="#1FC159BB" compact onPress={()=>{setShowSnack(false)}}/>} message="You are currently offline..." style={{ position: "absolute", backgroundColor: '#111317DD', start: 16, end: 16, bottom: 8 }}/>
        </Box>}
      </View>
    );
  };

export default memo(SongsScreen)