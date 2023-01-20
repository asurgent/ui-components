import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  createRef,
  forwardRef,
  useContext,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../../Form';
import { dispatchEvent } from '../../helpers';

const propTyps = {
  value: PropTypes.number,
  minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  disabled: PropTypes.func,
};

const defaultProps = {
  value: 0,
  minValue: null,
  maxValue: null,
  label: '',
  props: {},
  placeholder: '',
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
};

const NumberInput = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    minValue,
    maxValue,
    parseOutput,
    validator,
    disabled,
  } = props;
  const input = createRef();
  const { hook: form } = useContext(FormContext);
  const [value, setValue] = useState(parseInt(props.value || 0, 10));

  const max = useMemo(() => {
    if (typeof maxValue === 'function') {
      const values = form?.valueState;
      return maxValue(values, value);
    }

    return maxValue;
  }, [maxValue, form?.valueState, value]);

  const min = useMemo(() => {
    if (typeof minValue === 'function') {
      const values = form?.valueState;
      return minValue(values, value);
    }
    return minValue;
  }, [minValue, form?.valueState, value]);

  useEffect(() => {
    console.log('@ui-components -> 4.22.1-numbercomp.2');

    const initialValue = parseInt(props.value || 0, 10);

    const hasMin = Number.isInteger(min);
    const hasMax = Number.isInteger(max);

    if (hasMin && initialValue < min) {
      setValue(min);
      dispatchEvent(min, input);
    } else if (hasMax && initialValue > max) {
      setValue(max);
      dispatchEvent(max, input);
    } else {
      setValue(initialValue);
    }
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  const handleOnBlur = useCallback((e) => {
    const { target } = e;

    const num = parseInt(target.value, 10);

    const hasMin = Number.isInteger(min);
    const hasMax = Number.isInteger(max);

    if (hasMin && (num < min || !num)) {
      setValue(min);
      dispatchEvent(min, input);
    } else if (hasMax && num > max) {
      setValue(max);
      dispatchEvent(max, input);
    }
  }, [min, max, dispatchEvent, input]);

  const handleOnChange = useCallback((e) => {
    const { target: { value: _value } } = e;
    const num = parseInt(_value, 10);

    setValue(num);
  }, [min, max, dispatchEvent, input]);

  return (
    <input
      {...props.props}
      type="number"
      value={value}
      placeholder={placeholder}
      min={min}
      max={max}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      name={name}
      ref={input}
      disabled={disabled()}
    />
  );
});

NumberInput.defaultProps = defaultProps;
NumberInput.propTypes = propTyps;

export default NumberInput;
