import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import {View, FlatList} from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Box, Snackbar, Button } from '@react-native-material/core';
import usePlaylistSongsViewModel from '../view_model/PlaylistSongListViewModel';
import { PlaylistSongsScreenProps } from '../navigation/types';
import useSearchBarAnimation from '../res/animations/searchbar';
import CustomSnackbar from './components/Snackbar';



const PlaylistSongsScreen = ({navigation, route}: PlaylistSongsScreenProps) => {
    console.log('xyz')
    console.log(route.params)
    const playlist = route.params.playlist
    const actionType = route.params.actionType
    const message = route.params.message
    const song = route.params.song
    const {songs, snackMessage, isLoading, isMoreLoading, searchQuery, handleChangeSearchQuery, handleFavoritesChange, searchSongsInPlaylist} = usePlaylistSongsViewModel(playlist, song, actionType, message)
    const bottomTabBarHeight = useBottomTabBarHeight()
    const {handleScroll, searchBarAnimation} = useSearchBarAnimation()
    const [snack, setSnack] = useState(true)
    const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
    console.log('PlaylistSongsScreen rerender')

    useEffect(()=>{
      navigation.setOptions({headerTitle: playlist.name})
    }, [])


    const handleCardClick = useCallback((song: Song) => {
      navigation.navigate('Song', {song: song, playlist: playlist})
    },[])
    
    
    const handleMoreButtonClick = useCallback((song: Song) => {
      navigation.navigate('Modal', { song, playlist})
    },[])
    
  
    return (
      <View style={{flex: 1, marginBottom: bottomTabBarHeight}}>
        {songs.length > 20 && <SearchBar style={{height: searchBarAnimation}} editable={!isLoading} placeholder={playlist.name} searchQuery={searchQuery} onSearch={handleChangeSearchQuery} onScrollToTop={()=>flatListRef.current.scrollToOffset({ animated: true, offset: 0 })} />}
        {isLoading ? <ActivityIndicator style={{marginTop: 10}} size="large" color='#1FC159'/> :
        <SongsList 
              flatListRef={flatListRef}
              onScroll={handleScroll}
              isMoreLoading={isMoreLoading}
              songs={songs} 
              onCardClick={handleCardClick} 
              onFavoritesButtonClick={handleFavoritesChange}
              onMoreButtonClick={handleMoreButtonClick}
              onPageChanged={searchSongsInPlaylist}
              />
        }
        {(snackMessage) && <CustomSnackbar key={new Date().getTime()} message={snackMessage} buttonText={'Ok'}/>}
      </View>
    );
  };


export default memo(PlaylistSongsScreen)