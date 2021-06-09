import { useMemo } from 'react';

const useDelayTrigger = (timeout = 400) => {
  const state = useMemo(() => {
    const handler = (func) => func();
    let timer = setTimeout(() => {}, timeout);

    return {
      cancel: () => clearTimeout(timer),
      trigger: (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          handler(...args);
        }, timeout);
      },
    };
  }, [timeout]);

  return state;
};

export default useDelayTrigger;
