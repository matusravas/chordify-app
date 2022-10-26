import { useNavigation, useTheme } from '@react-navigation/native';
import useSongListViewModel from '../view_model/SongListViewModel';
import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import { View, FlatList, NativeSyntheticEvent, NativeScrollEvent, Animated, Text } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Snackbar, Box, Button } from '@react-native-material/core';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffectAfterMount } from '../utils/hooks';
import ModalMenuScreen from './modals/ModalMenuScreen';
import { SongsScreenProps } from '../navigation/types';
import useSearchBarAnimation from '../animations/searchbar';



const SongsScreen = ({ navigation, route }: SongsScreenProps) => {
  const { songs, searchQuery, isConnected, isLoading, isMoreLoading, handleChangeSearchQuery, handlePageChanged, handleFavoritesChange } = useSongListViewModel()
  const bottomTabBarHeight = useBottomTabBarHeight()

  const [showSnack, setShowSnack] = useState(true)
  // const offset = useRef(0)
  // const direction = useRef<'up'|'down'>('up')
  // const _delta = 100
  const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
  const theme = useTheme()
  const {handleScroll, searchBarAnimation} = useSearchBarAnimation()
  // const animation = new Animated.Value(100);

  // const animOut = useCallback(() => {
  //   Animated.timing(animation, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: false
  //   }).start()
  // }, [])

  // const animIn = useCallback(() => {
  //   Animated.timing(animation, {
  //     toValue: 100,
  //     duration: 500,
  //     useNativeDriver: false
  //   }).start()
  // }, [])


  // const searchBarAnimation = useRef(animation.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [0, 50],
  //   extrapolate: 'clamp'
  // })).current
  console.log('SongsScreen rerender')

  
  // useEffectAfterMount(()=>{
  //   console.log('effect')
  //   if (!isLoading) searchSongs()
  // // }, [route, isConnected])
  // }, [isConnected])

  const handleCardClick = useCallback((song: Song) => {
    console.log(song)
    navigation.navigate('Song', { song: song })
  }, [])


  const handleMoreButtonClick = useCallback((song: Song) => {
    console.log(song)
    navigation.navigate('Modal', { song: song })
    // setShowModal(true)
  }, [])

  // const handleSearch = useCallback((query: string) => {
  //   handleChangeSearchQuery(query)
  //   // flatListRef.current.scrollToOffset({ animated: false, offset: 0 })
  // }, [])


  // cost scrollHandler = useAnimatedScrollHandler()
  

  return (
    <View style={{ flex: 1, marginBottom: bottomTabBarHeight }}>
      {/* <Animated.View style={{height: animationXYZ}}> */}
        {/* <Text>Hello world</Text> */}
        <SearchBar style={{height: searchBarAnimation}} timeoutMilis={1000} searchQuery={searchQuery} onSearch={handleChangeSearchQuery} onScrollToTop={() => { flatListRef.current.scrollToOffset({ animated: true, offset: 0 }) }} />
      {/* </Animated.View> */}
      {isLoading ? <ActivityIndicator style={{ marginTop: 10 }} size="large" color='#1FC159' /> :
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
      {(!isConnected && showSnack) && <Box >
        <Snackbar action={<Button variant="text" title="Dismiss" color="#1FC159BB" compact onPress={() => { setShowSnack(false) }} />} message="You are currently offline..." style={{ position: "absolute", backgroundColor: '#111317DD', start: 16, end: 16, bottom: 8 }} />
      </Box>}
      {/* {showModal && <ModalMenu isOpen={showModal} showModal={setShowModal}/>} */}
    </View>
  );
};

export default memo(SongsScreen)