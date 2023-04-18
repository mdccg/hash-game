import React, { EffectCallback, useEffect, useRef } from 'react';

export const useEffectDeps = (effectCallback: EffectCallback, deps: React.DependencyList) => {
  const haveBeenUsed = useRef<boolean>(false);
  
  useEffect(() => {
    if (haveBeenUsed.current) {
      haveBeenUsed.current = true;
    } else {
      effectCallback();
    }
  }, deps);
}