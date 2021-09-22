import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import { FieldContext } from '../data/formContext';
import { withFormControl } from '../withWrapper';
import 'react-datepicker/dist/react-datepicker.css';

const TimeInput = ({ value, onChange }) => (
  <Input
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

TimeInput.propTypes = {
  value: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func.isRequired,
};

const Email = withFormControl((props) => {
  const { name, onChange, value } = useContext(FieldContext);
  const { placeholder, dateTime } = props;

  return (
    <DatePicker
      {...props}
      placeholderText={placeholder}
      name={name}
      selected={Moment.isDate(value) ? value : Moment().toDate()}
      customInput={<Input />}
      dateFormat={dateTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'}
      onChange={(date) => onChange({
        target: {
          value: Moment.isDate(date) ? date : Moment().toDate(),
          name,
        },
      })}
      showTimeInput
      customTimeInput={<TimeInput />}
    />

  );
});

export default Email;
