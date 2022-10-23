import { useNavigation, useTheme } from '@react-navigation/native';
import useSongListViewModel from '../view_model/SongListViewModel';
import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import {View, FlatList, NativeSyntheticEvent, NativeScrollEvent} from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Snackbar, Box, Button } from '@react-native-material/core';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffectAfterMount } from '../utils/hooks';
import ModalMenuScreen from './modals/ModalMenuScreen';
import { SongsScreenProps } from '../navigation/types';



const SongsScreen = ({navigation, route}: SongsScreenProps) => {
    const {songs, searchQuery, isConnected, isLoading, isMoreLoading, handleChangeSearchQuery, handlePageChanged, handleFavoritesChange} = useSongListViewModel()
    const bottomTabBarHeight = useBottomTabBarHeight()
    
    const [showSnack, setShowSnack] = useState(true)
    // const [showModal, setShowModal] = useState(false)
    const [searchBar, toggleSearchBar] = useState(true)
    const [offset, setOffset] = useState(0)
    
    const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
    console.log('SongsScreen rerender')
    const theme = useTheme()

    // useEffectAfterMount(()=>{
    //   console.log('effect')
    //   if (!isLoading) searchSongs()
    // // }, [route, isConnected])
    // }, [isConnected])

    const handleCardClick = useCallback((song: Song) => {
      console.log(song)
      navigation.navigate('Song', {song: song})
    }, [])
    
    
    const handleMoreButtonClick = useCallback((song: Song) => {
      console.log(song)
      navigation.navigate('Modal', {song: song})
      // setShowModal(true)
    }, [])
    
    // const handleSearch = useCallback((query: string) => {
    //   handleChangeSearchQuery(query)
    //   // flatListRef.current.scrollToOffset({ animated: false, offset: 0 })
    // }, [])
    

    // cost scrollHandler = useAnimatedScrollHandler()
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y
      // if (Math.abs(currentOffset - offset) > _delta) {
        // currentOffset > 0 && currentOffset > offset ? toggleSearchBar(false): toggleSearchBar(true)
        // const direction = (currentOffset > 0 && currentOffset > offset)
        //   ? 'down'
        //   : 'up'
        // direction === 'down'? toggleSearchBar(false) : toggleSearchBar(true)
        // console.log(direction)
        // console.log(currentOffset, offset)
        // setOffset(currentOffset)
    }

    return (
      <View style={{flex: 1, marginBottom: bottomTabBarHeight}}>
       <SearchBar visible={searchBar} timeoutMilis={1000} searchQuery={searchQuery} onSearch={handleChangeSearchQuery} onScrollToTop={()=>{flatListRef.current.scrollToOffset({ animated: true, offset: 0 })}}/>
        {isLoading? <ActivityIndicator style={{marginTop: 10}} size="large" color='#1FC159'/> :
        <SongsList 
              flatListRef={flatListRef}
              // isFetched={!isLoading}
              // toggleSearchBar={setSearchBarToggle}
              onScroll={handleScroll}
              isMoreLoading={isMoreLoading}
              songs={songs} 
              onCardClick={handleCardClick} 
              onFavoritesButtonClick={handleFavoritesChange}
              onMoreButtonClick={handleMoreButtonClick}
              onPageChanged={handlePageChanged}
              />}
        {(!isConnected && showSnack) &&<Box >
          <Snackbar action={<Button variant="text" title="Dismiss" color="#1FC159BB" compact onPress={()=>{setShowSnack(false)}}/>} message="You are currently offline..." style={{ position: "absolute", backgroundColor: '#111317DD', start: 16, end: 16, bottom: 8 }}/>
        </Box>}
        {/* {showModal && <ModalMenu isOpen={showModal} showModal={setShowModal}/>} */}
      </View>
    );
  };

export default memo(SongsScreen)