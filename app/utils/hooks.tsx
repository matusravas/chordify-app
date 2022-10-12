import {useRef, useEffect, DependencyList, EffectCallback} from 'react'

export const useEffectAfterMount = (callback: EffectCallback, dependencies: DependencyList | undefined) => {
    const mounted = useRef(false);
  
    useEffect(() => {
      if (mounted.current) {
        return callback();
      }
      mounted.current = true;
    }, dependencies);
  };