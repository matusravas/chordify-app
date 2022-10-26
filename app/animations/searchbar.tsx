import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useCallback, useRef } from 'react';


const useSearchBarAnimation = () => {
    const animation = new Animated.Value(100);
    const offset = useRef(0)
    const direction = useRef<'up'|'down'>('up')
    const _delta = useRef(0)
    
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // console.log('Scrol-------------')
      const currentOffset = event.nativeEvent.contentOffset.y
      if (Math.abs(currentOffset - offset.current) > _delta.current) {
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
    }, [])

    const animOut = useCallback(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        }).start()
      }, [])
    
      const animIn = useCallback(() => {
        Animated.timing(animation, {
          toValue: 100,
          duration: 500,
          useNativeDriver: false
        }).start()
      }, [])
    
    
      const searchBarAnimation = useRef(animation.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 50],
        extrapolate: 'clamp'
      })).current
    
    // return {handleScroll, animIn, animOut, searchBarAnimation}
    return {handleScroll, searchBarAnimation}
}

export default useSearchBarAnimation