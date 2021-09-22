/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { prevent, useEventCallback } from './formHook';

export const useGroupRepeat = ({
  form,
  index,
  formatter,
  name: repeatFieldName,
}) => {
  const isMounted = useRef(false);
  const fieldRegistry = useRef({});

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const registerField = useCallback(({ name, validator }) => {
    fieldRegistry.current[name] = { validator };
  }, [fieldRegistry]);

  const unregisterField = useCallback(({ name }) => {
    delete fieldRegistry.current[name];
  }, [fieldRegistry]);

  const getGroupValues = useCallback((changeEvent) => {
    const getter = () => {
      if (changeEvent) {
        const { name, value } = changeEvent;
        const group = form.state.values?.[repeatFieldName];
        const newGroup = group.map((item, i) => {
          if (i === index) {
            return { ...item, [name]: value };
          }
          return item;
        });

        return {
          values: {
            ...form.state.values,
            [repeatFieldName]: newGroup,
          },
        };
      }

      return form.state.values;
    };

    if (formatter && typeof formatter === 'function') {
      return formatter(getter());
    }

    return getter();
  }, [form.state, formatter, index, repeatFieldName]);

  const handleChange = useEventCallback(prevent((event) => {
    const { name, value } = event.target;
    form.dispatch({
      type: 'UPDATE_REPEAT_VALUE',
      payload: {
        repeatFieldName,
        index,
        name,
        value,
      },
    });
    form.onChange(getGroupValues(event.target), form.state);
  }), []);

  const getFieldProps = useCallback(({ name, ...fieldProps }) => {
    const props = {
      name,
      type: fieldProps.type || 'text',
      value: form.state.values?.[repeatFieldName]?.[index]?.[name] || '',
      onChange: handleChange,
    };

    return props;
  }, [form.state.values, handleChange, index, repeatFieldName]);

  return {
    ...form,
    registerField,
    unregisterField,
    handleChange,
    getFieldProps,
  };
};
