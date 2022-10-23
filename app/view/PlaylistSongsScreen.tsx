import { useNavigation, useTheme } from '@react-navigation/native';
import useSongListViewModel from '../view_model/SongListViewModel';
import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import {View, FlatList} from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Snackbar, Box, Button, Text } from '@react-native-material/core';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffectAfterMount } from '../utils/hooks';
import ModalMenuScreen from './modals/ModalMenuScreen';
import usePlaylistSongsViewModel from '../view_model/PlaylistSongListViewModel';
import PlaylistHeader from './components/PlaylistHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlaylistSongsScreenProps } from '../navigation/types';



const PlaylistSongsScreen = ({navigation, route}: PlaylistSongsScreenProps) => {
  
  // console.log(props)
  // console.log(playlist.playlistId)
    // const [songs, searchQuery, currentPage, setSearchQuery, handleAddToPlaylist] = useSongListViewModel()
    const playlist = route.params.playlist
    const {songs, isLoading, searchQuery, handleChangeSearchQuery, handleFavoritesChange} = usePlaylistSongsViewModel(playlist.id)
    const bottomTabBarHeight = useBottomTabBarHeight()
    const [showSnack, setShowSnack] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
    console.log('PlaylistSongsScreen rerender')
    
    useEffect(()=>{
      navigation.setOptions({headerTitle: playlist.name})
    }, [])

    const handleCardClick = useCallback((song: Song) => {
      console.log(song)
      navigation.navigate('Song', {song: song})
    },[])
    
    
    const handleMoreButtonClick = useCallback((song: Song) => {
      console.log(song)
      setShowModal(true)
    },[])

    // const handleAddToFavorites = (song: Song) => {
    //   console.log(song)
    // }
    
    // const handlePageChanged = useCallback(() => {
    //   console.log(`Page change: current page: ${currentPage} + 1` )
    //   // setCurrentPage(currentPage+1)
    //   // navigation.navigate('Song', {song: song})
    // },[])
    
    const handleSearch = useCallback((query: string) => {
      // console.log(`handling search ${query}`)
      handleChangeSearchQuery(query)
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 })
    },[])
    
    const handleScrollPositionChange = ()=>{
        // Todo when search is performed scroll to the top of the lis
    }
  
    return (
      <View style={{flex: 1, marginBottom: bottomTabBarHeight}}>
        {/* <PlaylistHeader playlist={playlist} /> */}
        <SearchBar placeholder={playlist.name} searchQuery={searchQuery} onSearch={handleSearch} />
        {isLoading && <ActivityIndicator style={{marginTop: 10}} size="large" color='#1FC159'/>}
        <SongsList 
              flatListRef={flatListRef}
              // isFetched={!isLoading}
              // onScroll={()=>{}}
              isMoreLoading={false}
              songs={songs} 
              onCardClick={handleCardClick} 
              onFavoritesButtonClick={handleFavoritesChange}
              onMoreButtonClick={handleMoreButtonClick}
              onPageChanged={()=>{}}
              />
        {showModal && <ModalMenuScreen isOpen={showModal} showModal={setShowModal}/>}
      </View>
    );
  };

export default memo(PlaylistSongsScreen)