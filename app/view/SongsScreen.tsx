import { useNavigation, useTheme } from '@react-navigation/native';
import useSongListViewModel from '../view_model/SongListViewModel';
import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import {View} from 'react-native'
import React, { useCallback } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const SongsScreen = () => {
    const [songs, searchQuery, currentPage, setSongs, setSearchQuery, setCurrentPage, handleAddToPlaylist] = useSongListViewModel()
    const bottomTabBarHeight = useBottomTabBarHeight()
    const navigation = useNavigation<any>();
    console.log('SongsScreen rerender')
    const theme = useTheme()
    // const handleCardClick = useCallback((song: Song) => {
    //   console.log(song)
    //   navigation.navigate('Song', {song: song})
    // },[])

    // const handleAddToFavorites = useCallback((song: Song) => {
    //   console.log(song)
    // },[])

    const handleCardClick = (song: Song) => {
      console.log(song)
      navigation.navigate('Song', {song: song})
    }

    // const handleAddToFavorites = (song: Song) => {
    //   console.log(song)
    // }
    
    const handlePageChanged = () => {
      console.log(`Page change: current page: ${currentPage} + 1` )
      // setCurrentPage(currentPage+1)
      // navigation.navigate('Song', {song: song})
    }
    
    const handleSearch = (query: string) => {
      console.log(`handling search ${query}`)
      setSearchQuery(query)
    }
    
  
    return (
      <View style={{flex: 1, marginBottom: bottomTabBarHeight}}>
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
        <SongsList songs={songs} 
              onCardClick={handleCardClick} 
              onAddToFavoritesClick={handleAddToPlaylist}
              onPageChanged={handlePageChanged}
              />
      </View>
    );
  };

export default SongsScreen