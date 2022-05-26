import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

export type StateReducer<S, A, E> = (state: S, action: A) => [S, E[]];

export type EffectReducer<E> = (effect: E) => EffectCleanup | void;
export type EffectCleanup = () => void;

export function useBireducer<S, A, E>(
  stateReducer: StateReducer<S, A, E>,
  effectReducer: EffectReducer<E>,
  defaultState: S
) {
  const [effects, setEffects] = useState<E[]>([]);
  const cleanups = useRef<EffectCleanup[]>([]);

  const reducer = useCallback(
    (state: S, action: A): S => {
      const [nextState, nextEffects] = stateReducer(state, action);
      setEffects(effects => [...nextEffects.reverse(), ...effects]);
      return nextState;
    },
    [stateReducer]
  );

  useEffect(() => {
    const effect = effects.pop();
    if (effect) {
      const cleanup = effectReducer(effect);
      if (cleanup) cleanups.current.push(cleanup);
      setEffects([...effects]);
    }
  }, [effects, effectReducer]);

  useEffect(() => {
    return () => {
      cleanups.current.forEach(cleanup => {
        cleanup();
      });
    };
  }, []);

  return useReducer(reducer, defaultState);
}
