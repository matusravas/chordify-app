import useSongListViewModel from '../view_model/SongListViewModel';
import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import { View, FlatList } from 'react-native'
import React, { memo, useCallback, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Snackbar, Box, Button } from '@react-native-material/core';
import { SongsScreenProps } from '../navigation/types';
import useSearchBarAnimation from '../animations/searchbar';



const SongsScreen = ({ navigation, route }: SongsScreenProps) => {
  const song = route.params?.song
  const actionType = route.params?.actionType
  const { songs, searchQuery, isConnected, isLoading, isMoreLoading, handleChangeSearchQuery, handlePageChanged, handleFavoritesChange } = useSongListViewModel(song, actionType)
  const bottomTabBarHeight = useBottomTabBarHeight()
  const [showSnack, setShowSnack] = useState(true)
  const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
  const { handleScroll, searchBarAnimation } = useSearchBarAnimation()

  console.log('SongsScreen rerender')

  const handleCardClick = useCallback((song: Song) => {
    // console.log(song)
    navigation.navigate('Song', { song: song })
  }, [])


  const handleMoreButtonClick = useCallback((song: Song) => {
    // console.log(song)
    navigation.navigate('Modal', {song})
  }, [])


  return (
    <View style={{ flex: 1, marginBottom: bottomTabBarHeight }}>
      <SearchBar style={{ height: searchBarAnimation }} timeoutMilis={1000} searchQuery={searchQuery} onSearch={handleChangeSearchQuery} onScrollToTop={() => { flatListRef.current.scrollToOffset({ animated: true, offset: 0 }) }} />
      {isLoading ? <ActivityIndicator style={{ marginTop: 10 }} size="large" color='#1FC159' /> :
        <SongsList
          flatListRef={flatListRef}
          onScroll={handleScroll}
          isMoreLoading={isMoreLoading}
          songs={songs}
          onCardClick={handleCardClick}
          onFavoritesButtonClick={handleFavoritesChange}
          onMoreButtonClick={handleMoreButtonClick}
          onPageChanged={handlePageChanged}
        />}
      {(!isConnected && showSnack) && <Box >
        <Snackbar action={<Button variant="text" title="Dismiss" color="#1FC159BB" compact onPress={() => { setShowSnack(false) }} />} message="You are currently offline..." style={{ position: "absolute", backgroundColor: '#111317DD', start: 16, end: 16, bottom: 8 }} />
      </Box>}
    </View>
  );
};

export default memo(SongsScreen)