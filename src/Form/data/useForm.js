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
  parent,
  onFieldError,
  onFieldValid,
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
    resetCount: 0,
    isSubmitting: false,
  });

  const clearFieldError = useCallback((name) => {
    dispatch({
      type: 'CLEAR_FIELD_ERROR',
      payload: { name },
    });
  }, []);

  const setFieldError = useCallback((name, value) => {
    dispatch({
      type: 'SET_FIELD_ERROR',
      payload: { name, value },
    });
  }, []);

  const runValidator = useEventCallback((event) => {
    const { name, value } = event;
    const fieldValidator = fieldRegistry.current?.[name]?.validator;
    const providerValidator = validators?.[name];

    const setter = (result) => {
      if (result?.isInvalid === true) {
        if (onFieldError) { onFieldError({ name, ...result }); }
        setFieldError(name, { name, ...result });
      } else {
        if (onFieldValid) { onFieldValid({ name, value }); }
        clearFieldError(name);
      }
    };

    if (fieldValidator && typeof fieldValidator === 'function') {
      setter(fieldValidator(event));
    } else if (providerValidator && typeof providerValidator === 'function') {
      setter(providerValidator(event));
    }
  });

  const runValidators = useEventCallback(() => {
    Object.entries(fieldRegistry.current)
      .forEach(([name]) => {
        runValidator({ name, value: state.values[name] });
      });

    Object.values(groupRegistry.current)
      .forEach((group) => {
        group.runValidators();
      });
  });

  const registerField = useCallback(({ name, validator, group }, isGroup = false) => {
    if (isGroup) {
      groupRegistry.current[name] = group;
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
  }));

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
  }));

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
    clearFieldError,
    setFieldError,
    getFieldProps,
    runValidators,
  };
};
