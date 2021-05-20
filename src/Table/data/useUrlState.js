import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

const update = (key, state, search) => {
  const query = {
    ...queryString.parse(search),
    [key]: btoa(JSON.stringify(state)),
  };

  return `?${queryString.stringify(query)}`;
};

const initialize = (key, initalState, location) => {
  try {
    const search = queryString.parse(location.search);
    return JSON.parse(atob(search[key]));
  } catch (err) {
    return initalState || {};
  }
};

const useUrlState = (stateKey = 'q', initalState, trigger) => {
  const history = useHistory();
  const [prev, setPrev] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const { location, replace } = history;
    if (current !== null) {
      replace({
        ...location,
        search: update(stateKey, current, location.search),
      });
      trigger(current, prev);
    } else {
      const existingState = initialize(stateKey, initalState, location);
      setCurrent(existingState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return {
    setState: (newState) => {
      setPrev(current);
      setCurrent(newState);
    },
    getState: () => current,
    getKey: (key) => current?.[key],
    setKey: (key, value) => {
      setPrev(current);
      setCurrent({ ...current, [key]: value });
    },
  };
};

export default useUrlState;
