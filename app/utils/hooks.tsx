import {useRef, useEffect, DependencyList, EffectCallback} from 'react'

export const useEffectAfterMount = (callback: EffectCallback, dependencies: DependencyList | undefined) => {
    const mounted = useRef(true);
  
    useEffect(() => {
      if (!mounted.current) {
        return callback();
      }
      mounted.current = false;
    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
  };