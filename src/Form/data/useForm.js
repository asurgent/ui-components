/* eslint-disable no-unused-vars */
import {
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from 'react';

import useEventCallback from '../../data/useEventCallback';
import withPrevent from '../../data/withPrevent';
import { formReducer } from './reducer';

export const useForm = ({
  onSubmit,
  onReset,
  onChange,
  validateOnChange,
  validators,
  formatter,
  ...rest
}) => {
  const isMounted = useRef(false);
  const fieldRegistry = useRef({});
  const groupRegistry = useRef({});
  const initialValues = useRef(rest.initialValues || {});
  const initialErrors = useRef(rest.initialErrors || {});

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const [state, dispatch] = useReducer(formReducer, {
    errors: initialErrors.current || {},
    values: initialValues.current,
    submitCount: 0,
    isSubmitting: false,
  });

  const clearFieldError = useCallback((name) => {
    dispatch({
      type: 'CLEAR_FIELD_ERROR',
      payload: { name },
    });
  },
  []);

  const setFieldError = useCallback((name, value) => {
    dispatch({
      type: 'SET_FIELD_ERROR',
      payload: { name, value },
    });
  },
  []);

  const runValidator = useCallback((event) => {
    const { name } = event;
    const fieldValidator = fieldRegistry.current?.[name]?.validator;
    const providerValidator = validators?.[name];

    const setter = (result) => {
      if (result?.isValid === true || result?.isValid === undefined) {
        clearFieldError(name);
      } else {
        setFieldError(name, result?.error);
      }
    };

    if (fieldValidator && typeof fieldValidator === 'function') {
      setter(fieldValidator(event));
    } else if (providerValidator && typeof providerValidator === 'function') {
      setter(providerValidator(event));
    }
  }, [clearFieldError, setFieldError, validators]);

  const runValidators = useCallback(() => {
    Object.entries(fieldRegistry.current)
      .forEach(([name, { validator }]) => {
        if (validator) {
          runValidator({ name, value: state.values[name] });
        }
      });

    Object.values(groupRegistry.current)
      .forEach((group) => {
        group.runValidators();
      });
  }, [runValidator, state.values]);

  const appendRepeatGroup = useCallback((name, max) => {
    const group = state.values?.[name];
    const newGroup = [...(group || []), {}];

    const message = {
      type: 'UPDATE_VALUE',
      payload: { name, value: newGroup },
    };

    if (typeof max === 'number' && group) {
      if (max > group.length) {
        dispatch(message);
      }
    } else {
      dispatch(message);
    }
  },
  [state.values]);

  const clearRepeatGroup = useCallback((name, index, min) => {
    const group = state.values?.[name];
    const errors = state.errors?.[name];

    const newGroup = group.filter((_, idx) => index !== idx);

    const groupMessage = {
      type: 'UPDATE_VALUE',
      payload: { name, value: newGroup },
    };

    if (typeof min === 'number' && group) {
      if (min <= group.length) {
        dispatch(groupMessage);
      }
    } else {
      dispatch(groupMessage);
    }

    if (errors) {
      const newError = errors.filter((_, idx) => index !== idx);
      console.log(errors, newError);
      const errorMessage = {
        type: 'SET_FIELD_ERROR',
        payload: { name, value: newError },
      };
      dispatch(errorMessage);
    }
  }, [state.errors, state.values]);

  const handleRepeatGroupChange = useCallback((values, name, index) => {
    const groupValues = rest.state.values[name];

    if (groupValues) {
      const newGroupValues = groupValues.map((item, i) => (index === i ? { ...values } : item));
      rest.handleChange({ target: { name, value: newGroupValues } });
    } else {
      rest.handleChange({ target: { name, value: [{ ...values }] } });
    }
  }, [rest]);

  const registerField = useCallback(({ name, validator, ...restProps }, isGroup = false) => {
    if (isGroup) {
      groupRegistry.current[name] = { ...restProps };
    } else {
      fieldRegistry.current[name] = { validator };
    }
  }, [fieldRegistry]);

  const unregisterField = useCallback(({ name }, isGroup = false) => {
    if (isGroup) {
      delete groupRegistry.current[name];
    } else {
      delete fieldRegistry.current[name];
    }
  }, [fieldRegistry]);

  const resetForm = useCallback(() => {
    const values = initialValues.current;
    const errors = initialErrors.current;

    dispatch({
      type: 'RESET_FORM',
      payload: {
        errors,
        values,
        submitCount: 0,
        isSubmitting: false,
      },
    });

    Object.values(groupRegistry.current)
      .forEach((group) => {
        group.handleReset();
      });
  }, []);

  const getFormValues = useCallback((changeEvent) => {
    const getter = () => {
      if (changeEvent) {
        const { name, value } = changeEvent;
        return { ...state.values, [name]: value };
      }
      return state.values;
    };

    if (formatter && typeof formatter === 'function') {
      return formatter(getter());
    }
    return getter();
  }, [formatter, state.values]);

  const handleChange = useEventCallback(withPrevent((event) => {
    //  we can assume its a normal user-triggerd-event
    if (event.target) {
      const { name, value } = event.target;
      dispatch({ type: 'UPDATE_VALUE', payload: { name, value } });

      if (validateOnChange) {
        runValidator(event.target);
      }
    }

    if (onChange && typeof onChange === 'function') {
      onChange(getFormValues(event.target), state);
    }
  }), []);

  const handleSubmit = useEventCallback(withPrevent(() => {
    const event = async () => {
      if (onSubmit && typeof onSubmit === 'function') {
        runValidators();
        dispatch({ type: 'SET_SUBMIT', payload: true });
        dispatch({ type: 'SET_SUBMIT_COUNT', payload: state.submitCount + 1 });
        await onSubmit({ ...state, values: getFormValues() });
        dispatch({ type: 'SET_SUBMIT', payload: false });
      }
    };

    event();
  }), [fieldRegistry]);

  const handleReset = useEventCallback(withPrevent(() => {
    resetForm();
    if (onReset && typeof onReset === 'function') {
      const getter = () => {
        if (formatter && typeof formatter === 'function') {
          return formatter(initialValues.current);
        }

        return initialValues.current;
      };
      onReset(getter());
    }
  }), []);

  const getFieldProps = useCallback(({ name, ...fieldProps }) => {
    const props = {
      name,
      type: fieldProps.type || 'text',
      value: state.values[name] || '',
      onChange: handleChange,
    };

    return props;
  }, [state.values, handleChange]);

  return {
    state,
    dispatch,
    isMounted,
    registerField,
    unregisterField,
    handleReset,
    handleSubmit,
    handleChange,
    setFieldError,
    getFieldProps,
    runValidators,
    appendRepeatGroup,
    clearRepeatGroup,
    handleRepeatGroupChange,
  };
};
