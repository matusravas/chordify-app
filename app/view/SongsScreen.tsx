import { ActivityIndicator, Box, Button, Snackbar } from '@react-native-material/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { memo, useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Song } from '../model/domain/types';
import { SongsScreenProps } from '../navigation/types';
import useSearchBarAnimation from '../res/animations/searchbar';
import useSongListViewModel from '../view_model/SongListViewModel';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';


const SongsScreen = ({ navigation }: SongsScreenProps) => {
  const { songs, searchQuery, isConnected, isLoading, isMoreLoading, isTodaysTop,
     handleChipSelectionChange, handleChangeSearchQuery, handlePageChanged, handleFavoritesChange } = useSongListViewModel()
  const bottomTabBarHeight = useBottomTabBarHeight()
  const [showSnack, setShowSnack] = useState(true)
  const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
  const { handleScroll, searchBarAnimation, getCurrentScrollOffset } = useSearchBarAnimation(searchQuery? 50: 100)

  console.log('SongsScreen rerender')


  const handleCardClick = useCallback((song: Song) => {
    navigation.navigate('Song', { song: song, sendDataToParent: handleFavoritesChange})
  }, [])
  

  const handleMoreButtonClick = useCallback((song: Song) => {
    navigation.navigate('Modal', {song, sendDataToParent: handleFavoritesChange})
  }, [])


  return (
    <View style={{ flex: 1, marginBottom: bottomTabBarHeight }}>
      <SearchBar style={{ height: searchBarAnimation }} todaysTop={isTodaysTop} onChipSelection={handleChipSelectionChange} editable={!isLoading} timeoutMilis={1000} searchQuery={searchQuery} onSearch={handleChangeSearchQuery} onScrollToTop={() => { flatListRef.current.scrollToOffset({ animated: true, offset: 0 }) }} />
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
      {/* {snackMessage && <CustomSnackbar key={new Date().getTime()} message={snackMessage}/>} */}
    </View>
  );
};

export default memo(SongsScreen)