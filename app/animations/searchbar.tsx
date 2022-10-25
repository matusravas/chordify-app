import { Animated } from 'react-native'
import { useCallback, useRef } from 'react';


const useSearchBarAnimation = () => {
    const animation = new Animated.Value(100);
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
    
    return {animIn, animOut, searchBarAnimation}
}

export default useSearchBarAnimation