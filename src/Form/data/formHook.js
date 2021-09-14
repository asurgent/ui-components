/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  useLayoutEffect,
  useRef,
  useEffect,
  useReducer,
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

const prevent = (fn) => (e) => {
  if (e && e.preventDefault && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  if (e && e.stopPropagation && typeof e.preventDefault === 'function') {
    e.stopPropagation();
  }

  fn(e);
};

const reducer = (state, msg) => {
  switch (msg.type) {
    case 'REGISTER_FIELD':
      return { ...state, values: { ...state.values, [msg.payload.name]: msg.payload.value } };
    case 'REMOVE_FIELD': {
      const { [msg.payload.name]: remove, ...rest } = state.values;
      return { ...state, values: rest };
    }
    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [msg.payload.field]: msg.payload.value },
      };
    case 'CLEAR_FIELD_ERROR': {
      const { [msg.payload.field]: _, ...rest } = state.errors;
      return {
        ...state,
        errors: { ...rest },
      };
    } case 'RESET_FORM':
      return { ...state, ...msg.payload };
    case 'UPDATE_VALUE':
      return { ...state, values: { ...state.values, [msg.payload.name]: msg.payload.value } };
    case 'SET_SUBMIT':
      console.log({ ...state, isSubmitting: msg.payload });
      return { ...state, isSubmitting: msg.payload };
    case 'SET_SUBMIT_COUNT':
      return { ...state, submitCount: msg.payload };
    default:
      return { ...state };
  }
};

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
  const initialValues = useRef(rest.initialValues || {});
  const initialErrors = useRef(rest.initialErrors || {});

  const [state, dispatch] = useReducer(reducer, {
    errors: initialErrors.current || {},
    values: initialValues.current,
    submitCount: 0,
    isSubmitting: false,
  });

  const clearFieldError = useCallback((field) => {
    dispatch({
      type: 'CLEAR_FIELD_ERROR',
      payload: { field },
    });
  },
  []);

  const setFieldError = useCallback((field, value) => {
    dispatch({
      type: 'SET_FIELD_ERROR',
      payload: { field, value },
    });
  },
  []);

  const registerField = useCallback(({ name, validator }) => {
    fieldRegistry.current[name] = { validator };
  }, [fieldRegistry]);

  const unregisterField = useCallback(({ name }) => {
    delete fieldRegistry.current[name];
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
  }, []);

  const getFormValues = useCallback(() => {
    if (formatter && typeof formatter === 'function') {
      return formatter(state.values);
    }
    return state.values;
  }, [formatter, state.values]);

  const runValidator = useCallback((name, value) => {
    if (validators?.[name] && typeof validators?.[name] === 'function') {
      const { fail, error } = validators?.[name](value);

      if (fail) {
        setFieldError(name, error);
      } else {
        clearFieldError(name);
      }
    }
  }, [clearFieldError, setFieldError, validators]);

  const runValidators = useCallback(() => {
    Object.entries(fieldRegistry.current)
      .forEach(([name, { validator }]) => {
        if (validator) {
          runValidator(name, state.values[name]);
        }
      });
  }, [runValidator, state.values]);

  const handleChange = useEventCallback(prevent((event) => {
    const { name, value } = event.target;
    dispatch({ type: 'UPDATE_VALUE', payload: { name, value } });

    if (validateOnChange) {
      runValidator(name, value);
    }

    if (onChange && typeof onChange === 'function') {
      onChange(getFormValues(), state);
    }
  }), []);

  const handleSubmit = useEventCallback(prevent(() => {
    const event = async () => {
      if (onSubmit && typeof onSubmit === 'function') {
        runValidators();
        dispatch({ type: 'SET_SUBMIT', payload: true });
        dispatch({ type: 'SET_SUBMIT_COUNT', payload: state.submitCount + 1 });
        await onSubmit(getFormValues(), state);
        dispatch({ type: 'SET_SUBMIT', payload: false });
      }
    };

    event();
  }), [fieldRegistry]);

  const handleReset = useEventCallback(prevent(() => {
    resetForm();
    if (onReset && typeof onReset === 'function') {
      onReset(getFormValues(), state);
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

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    state,
    isMounted,
    registerField,
    unregisterField,
    handleReset,
    handleSubmit,
    handleChange,
    setFieldError,
    getFieldProps,
  };
};
