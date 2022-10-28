import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import {View, FlatList} from 'react-native'
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator } from '@react-native-material/core';
import usePlaylistSongsViewModel from '../view_model/PlaylistSongListViewModel';
import { PlaylistSongsScreenProps } from '../navigation/types';
import useSearchBarAnimation from '../animations/searchbar';



const PlaylistSongsScreen = ({navigation, route}: PlaylistSongsScreenProps) => {
    const playlist = route.params.playlist
    const {songs, isLoading, isMoreLoading, searchQuery, handleChangeSearchQuery, handleFavoritesChange, searchSongsInPlaylist} = usePlaylistSongsViewModel(playlist.id)
    const bottomTabBarHeight = useBottomTabBarHeight()
    const {handleScroll, searchBarAnimation} = useSearchBarAnimation()
    const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
    console.log('PlaylistSongsScreen rerender')

    useEffect(()=>{
      navigation.setOptions({headerTitle: playlist.name})
    }, [])


    const handleCardClick = useCallback((song: Song) => {
      navigation.navigate('Song', {song: song})
    },[])
    
    
    const handleMoreButtonClick = useCallback((song: Song) => {
      navigation.navigate('Modal', { song: song, playlist: playlist })
    },[])

    
    const handleSearch = useCallback((query: string) => {
      handleChangeSearchQuery(query)
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 })
    },[])
    
  
    return (
      <View style={{flex: 1, marginBottom: bottomTabBarHeight}}>
        {songs.length > 20 && <SearchBar style={{height: searchBarAnimation}} placeholder={playlist.name} searchQuery={searchQuery} onSearch={handleSearch} onScrollToTop={()=>flatListRef.current.scrollToOffset({ animated: true, offset: 0 })} />}
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
      </View>
    );
  };


export default memo(PlaylistSongsScreen)