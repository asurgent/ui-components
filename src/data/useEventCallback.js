import {
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';

const useEventCallback = (fn) => {
  const ref = useRef(fn);
  // we copy a ref to the callback scoped to the current state/props on each render
  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args) => ref.current(...args), [ref]);
};

export default useEventCallback;
