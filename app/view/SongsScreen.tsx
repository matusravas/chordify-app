import { useNavigation, useTheme } from '@react-navigation/native';
import useSongListViewModel from '../view_model/SongListViewModel';
import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import { View, FlatList, NativeSyntheticEvent, NativeScrollEvent, Animated } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Snackbar, Box, Button } from '@react-native-material/core';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffectAfterMount } from '../utils/hooks';
import ModalMenuScreen from './modals/ModalMenuScreen';
import { SongsScreenProps } from '../navigation/types';



const SongsScreen = ({ navigation, route }: SongsScreenProps) => {
  const { songs, searchQuery, isConnected, isLoading, isMoreLoading, handleChangeSearchQuery, handlePageChanged, handleFavoritesChange } = useSongListViewModel()
  const bottomTabBarHeight = useBottomTabBarHeight()

  const [showSnack, setShowSnack] = useState(true)
  // const [showModal, setShowModal] = useState(false)
  const [isSearchBarOpened, toggleSearchBar] = useState(true)
  // const [offset, setOffset] = useState(0)
  const offset = useRef(0)
  const direction = useRef<'up'|'down'>('up')
  const _delta = 100
  // const isSearchBarOpened = useRef(true)
  // let offset
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
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log('Scrol-------------')
    const currentOffset = event.nativeEvent.contentOffset.y
    if (Math.abs(currentOffset - offset.current) > _delta) {
      // currentOffset > 0 && currentOffset > offset.current ? toggleSearchBar(false): toggleSearchBar(true)
      const dir = (currentOffset > 0 && currentOffset > offset.current) ? 'down': 'up'
      if (dir !== direction.current) {
        dir === 'down' ? animOut() : animIn()
        direction.current = dir
      }  //toggleSearchBar(false) : toggleSearchBar(true)
      // console.log(direction)
      // console.log(currentOffset, offset)
      // setOffset(currentOffset)
      offset.current = currentOffset
    }
    // console.log(isSearchBarOpened.current)
  }

  const fadeAnim = useRef(new Animated.Value(0)).current;



  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };
  const translateY = new Animated.Value(0)

  // const translateY = scrollY.interpolate({
  //   inputRange: [0, 58],
  //   outputRange: [0, -58]
  // })

  const anim = useRef(new Animated.Value(0)).current;


  const animOut = () => {
    Animated.timing(anim, {
      toValue: -58,
      duration: 250,
      useNativeDriver: true
    }).start()
  }

  const animIn = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start()
  }

  // isSearchBarOpened?animIn(): animOut()
  // isSearchBarOpened?fadeIn(): fadeOut()

  return (
    <View style={{ flex: 1, marginBottom: bottomTabBarHeight }}>
      {/* <Animated.View style={{  transform: [{ translateY: anim }] }}> */}
        <SearchBar style={{  transform: [{ translateY: anim }] }} timeoutMilis={1000} searchQuery={searchQuery} onSearch={handleChangeSearchQuery} onScrollToTop={() => { flatListRef.current.scrollToOffset({ animated: true, offset: 0 }) }} />
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