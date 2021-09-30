/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  useLayoutEffect,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from 'react';

export const useEventCallback = (fn) => {
  const ref = useRef(fn);
  // we copy a ref to the callback scoped to the current state/props on each render
  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args) => ref.current(...args), [ref]);
};

export const prevent = (fn) => (e) => {
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
  const groupRegistry = useRef({});
  const initialValues = useRef(rest.initialValues || {});
  const initialErrors = useRef(rest.initialErrors || {});

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

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
    const newGroup = group.filter((_, idx) => index !== idx);
    console.log(newGroup);

    const message = {
      type: 'UPDATE_VALUE',
      payload: { name, value: newGroup },
    };

    if (typeof min === 'number' && group) {
      if (min <= group.length) {
        dispatch(message);
      }
    } else {
      dispatch(message);
    }
  },
  [state.values]);

  const handleRepeatGroupChange = useCallback((values, name, index) => {
    const groupValues = rest.state.values[name];

    if (groupValues) {
      const newGroupValues = groupValues.map((item, i) => (index === i ? { ...values } : item));
      rest.handleChange({ target: { name, value: newGroupValues } });
    } else {
      rest.handleChange({ target: { name, value: [{ ...values }] } });
    }
  }, [rest]);

  const registerGroup = useCallback(({ name, ...groupHook }) => {
    groupRegistry.current[name] = { ...groupHook };
  }, [groupRegistry]);

  const unregisterGroup = useCallback(({ name }) => {
    delete groupRegistry.current[name];
  }, [groupRegistry]);

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

  const handleChange = useEventCallback(prevent((event) => {
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

  const handleSubmit = useEventCallback(prevent(() => {
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

  const handleReset = useEventCallback(prevent(() => {
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
    registerGroup,
    unregisterGroup,
    runValidators,
    appendRepeatGroup,
    clearRepeatGroup,
    handleRepeatGroupChange,
  };
};
