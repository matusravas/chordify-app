import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useCallback, useRef } from 'react';


const useSearchBarAnimation = () => {
    const animation = new Animated.Value(100);
    const offset = useRef(0)
    const direction = useRef<'up'|'down'>('up')
    const _delta = 50 //useRef(100)
    
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y
      if (Math.abs(currentOffset - offset.current) <= _delta) return
      const dir = (currentOffset > 0 && currentOffset > offset.current) ? 'down': 'up'
      if (dir !== direction.current) {
        dir === 'down' ? animOut() : animIn()
        direction.current = dir
      }
      // console.log('offset')
      offset.current = currentOffset
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