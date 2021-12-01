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

const initialize = (key, initialState, location) => {
  try {
    const search = queryString.parse(location.search);
    return JSON.parse(atob(search[key]));
  } catch (err) {
    return initialState || {};
  }
};

const useUrlState = (stateKey = 'q', initialState, trigger, noUrlState = false) => {
  const history = useHistory();
  const [prev, setPrev] = useState(null);
  const [current, setCurrent] = useState(null);

  const iface = {
    prev,
    current,
    setState: (newState) => {
      setPrev(current);
      setCurrent(newState);
    },
    getState: () => current,
    getKey: (key) => current?.[key],
    setKeys: (values) => {
      setPrev(current);
      setCurrent({ ...current, ...values });
    },
    setKey: (key, value) => {
      setPrev(current);
      setCurrent({ ...current, [key]: value });
    },
  };

  useEffect(() => {
    const { location, replace } = history;
    if (current !== null) {
      if (!noUrlState) {
        replace({
          ...location,
          search: update(stateKey, current, location.search),
        });
      }

      trigger(iface, current, prev);
    } else {
      const existingState = initialize(stateKey, initialState, location);
      setCurrent(existingState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return iface;
};

export default useUrlState;
