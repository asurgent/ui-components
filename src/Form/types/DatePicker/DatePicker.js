import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  createRef,
} from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import ThemeProvider from './DatePickerThemeProvider';
import * as C from './DatePicker.styled';
import { dispatchEvent } from '../../helpers';

const getStartOfDay = (val) => moment(val).startOf('day').toISOString();

const DatePicker = forwardRef((props, ref) => {
  const {
    name,
    format,
    parseOutput,
    validator,
    maxDate,
    maxDateMessage,
    minDate,
    minDateMessage,
    disabled,
  } = props;

  const input = createRef();
  const [value, setValue] = useState(getStartOfDay(props.value));

  useEffect(() => {
    setValue(getStartOfDay(props.value));
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  return (
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <C.DatePicker
          format={format}
          fullWidth
          maxDate={maxDate}
          minDate={minDate}
          value={value}
          onChange={(momentDate) => {
            setValue(getStartOfDay(momentDate));
            dispatchEvent(getStartOfDay(momentDate), input);
          }}
          maxDateMessage={maxDateMessage}
          minDateMessage={minDateMessage}
          inputVariant="outlined"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          disabled={disabled()}
          {...props.props}
        />
      </MuiPickersUtilsProvider>
      <input type="text" style={{ display: 'none' }} readOnly name={name} value={value} ref={input} />
    </ThemeProvider>
  );
});

DatePicker.propTypes = {
  label: PropTypes.string,
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  maxDateMessage: PropTypes.string,
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  minDateMessage: PropTypes.string,
  noLabel: PropTypes.bool,
  tooltip: PropTypes.string,
  props: PropTypes.instanceOf(Object),
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  disabled: PropTypes.func,
};

DatePicker.defaultProps = {
  label: '',
  format: 'YYYY-MM-DD',
  value: getStartOfDay(moment()),
  minDate: moment('0001-01-01'),
  minDateMessage: '',
  maxDate: moment('9999-12-31'),
  maxDateMessage: '',
  noLabel: false,
  tooltip: '',
  props: {},
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
};

export default DatePicker;
