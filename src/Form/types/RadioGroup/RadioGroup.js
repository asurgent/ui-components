import React, {
  useState,
  createRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/react';
import * as C from './RadioGroup.styled';

const propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  parseOutput: PropTypes.func,
  props: PropTypes.instanceOf(Object),
  disabled: PropTypes.func,
};

const defaultProps = {
  value: '',
  options: [],
  props: {},
  parseOutput: (val) => val || '',
  disabled: () => false,
};

const RadioGroup = forwardRef((props, ref) => {
  const {
    name,
    options,
    parseOutput,
    disabled,
  } = props;
  const { colors } = useTheme();

  const [val, setVal] = useState(props.value || null);
  const input = createRef();

  useEffect(() => {
    setVal(props.value);
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(val),
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  return (
    <C.FieldSet onChange={({ target }) => setVal(target.value)}>
      <C.RadioWrapper vertical={props?.props?.vertical}>
        {options.map((opt) => (
          <C.Label key={opt.key || opt.label || opt.value} colors={colors}>
            <C.RadioInput
              colors={colors}
              type="radio"
              name={name}
              value={opt.value}
              checked={val === opt.value}
              ref={val === opt.value ? input : null}
              readOnly
              disabled={disabled()}
              {...props.props}
            />
            <C.CheckMark />
            <C.Text>{opt.label}</C.Text>
          </C.Label>
        ))}
      </C.RadioWrapper>
    </C.FieldSet>
  );
});

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
