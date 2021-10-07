/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import MomentUtils from '@date-io/moment';
import { Input } from '@material-ui/core';
import { Input as InputField } from '@chakra-ui/react';
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { FieldContext } from '../data/formContext';
import { withFormControl } from '../withWrapper';
import 'react-datepicker/dist/react-datepicker.css';

const Date = withFormControl((props) => {
  const { name, onChange, value } = useContext(FieldContext);
  const {
    dateTime,
    disabled,
    maxDate,
    minDate,
    maxDateMessage,
    minDateMessage,
  } = props;

  const renderInput = () => (
    <InputField
      type="text"
      onClick={props.onClick}
      value={props.value}
      onChange={props.onChange}
    />
  );

  const Component = dateTime ? DateTimePicker : DatePicker;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Component
        fullWidth
        ampm={false}
        format="YYYY-MM-DD hh:mm"
        disabled={disabled}
        maxDate={maxDate}
        minDate={minDate}
        value={value || Moment()}
        onChange={(date) => {
          console.log(date);
          onChange({
            target: {
              value: Moment(date).toString(),
              name,
            },
          });
        }}
        maxDateMessage={maxDateMessage}
        minDateMessage={minDateMessage}
        inputVariant="outlined"
        // TextFieldComponent={renderInput}
      />
    </MuiPickersUtilsProvider>
  );
});

export default Date;
