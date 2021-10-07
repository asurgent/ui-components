/* eslint-disable no-unused-vars */
import {
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { FromContext, GroupContext } from './formContext';

export const useRepeatGroup = (initialize) => {
  const {
    min,
    max,
    name,
    numberOfGroups,
  } = useContext(GroupContext);

  const parent = useContext(FromContext);

  useEffect(() => {
    if (initialize) {
      const group = parent.initialValues?.[name];
      const total = group?.length > (min || 0) ? group?.length : min;
      const newGroup = Array.from(Array(total || 0), (_, i) => group?.[i] || ({}));
      parent.dispatch({
        type: 'UPDATE_VALUE',
        payload: { name, value: newGroup },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, parent.state.resetCount]);

  const groups = useMemo(() => {
    const group = (parent.state.values?.[name] || []);

    return group.map((_, index) => ({
      key: `${index}-${new Date().getTime()}`,
      initialValues: parent.state.values[name]?.[index] || {},
      initialErrors: parent.state.errors[name]?.[index] || {},
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfGroups, parent.state.resetCount]);

  const appendRepeatGroup = useCallback(() => {
    const group = parent.state.values?.[name];
    const newGroup = [...(group || []), {}];

    const message = {
      type: 'UPDATE_VALUE',
      payload: { name, value: newGroup },
    };

    if (typeof max === 'number' && group) {
      if (max > group.length) {
        parent.dispatch(message);
      }
    } else {
      parent.dispatch(message);
    }
  },
  [max, name, parent]);

  const clearRepeatGroup = useCallback((index) => {
    const group = parent.state.values?.[name];
    const errors = parent.state.errors?.[name];

    const newGroup = group.filter((_, idx) => index !== idx);

    const groupMessage = {
      type: 'UPDATE_VALUE',
      payload: { name, value: newGroup },
    };

    if (typeof min === 'number' && group) {
      if (min <= group.length) {
        parent.dispatch(groupMessage);
      }
    } else {
      parent.dispatch(groupMessage);
    }

    if (errors) {
      const newError = errors.filter((_, idx) => index !== idx);
      const errorMessage = {
        type: 'SET_FIELD_ERROR',
        payload: { name, value: newError },
      };
      parent.dispatch(errorMessage);
    }
  }, [min, name, parent]);

  const handleRepeatGroupChange = useCallback((values, index) => {
    const groupValues = parent.state.values[name];

    if (groupValues) {
      const newGroupValues = groupValues.map((item, i) => (index === i ? { ...values } : item));
      parent.handleChange({ target: { name, value: newGroupValues } });
    } else {
      parent.handleChange({ target: { name, value: [{ ...values }] } });
    }
  }, [name, parent]);

  const handleGroupValidation = useCallback((errorState) => {
    if (Object.keys(errorState).length === 0) {
      parent.clearFieldError(name, errorState);
    } else {
      parent.setFieldError(name, errorState);
    }
  }, [name, parent]);

  return {
    groups,
    clearRepeatGroup,
    appendRepeatGroup,
    handleGroupValidation,
    handleRepeatGroupChange,
  };
};
