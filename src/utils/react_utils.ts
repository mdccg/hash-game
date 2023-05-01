import React, { EffectCallback, useEffect, useRef } from 'react';
import MatchResultType from './../types/MatchResultType';
import CrossIcon from './../components/CrossIcon';
import CircleIcon from './../components/CircleIcon';
import DrawIcon from './../components/DrawIcon';

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

export const getIconComponent = (matchResult: MatchResultType) => (
  matchResult === 'X' ? CrossIcon : (matchResult === 'O' ? CircleIcon : DrawIcon)
);