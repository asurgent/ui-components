import React, { useContext } from 'react';
import Moment from 'moment';
import MomentUtils from '@date-io/moment';
import {
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MdiIcon from '@mdi/react';
import { mdiCalendar } from '@mdi/js';
import { FieldContext } from '../data/formContext';
import { withFormControl } from '../withWrapper';

const renderInput = ({ onClick, onChange, value }) => {
  const handleOnChange = (...args) => {
    if (onChange) {
      onChange(...args);
    }
  };
  return (
    <InputGroup>
      <InputRightElement
        onClick={onClick}
        pointerEvents="none"
        color="gray.300"
      >
        <MdiIcon size={0.7} path={mdiCalendar} />
      </InputRightElement>
      <Input
        type="text"
        value={value}
        onClick={onClick}
        onChange={handleOnChange}
      />
    </InputGroup>
  );
};

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

  const Component = dateTime ? DateTimePicker : DatePicker;

  const handleOnChange = (date) => {
    onChange({
      target: {
        value: Moment(date).toString(),
        name,
      },
    });
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Component
        fullWidth
        ampm={false}
        format={`YYYY-MM-DD${dateTime ? ' hh:mm' : ''}`}
        disabled={disabled}
        maxDate={maxDate}
        minDate={minDate}
        value={value || Moment()}
        onChange={handleOnChange}
        maxDateMessage={maxDateMessage}
        minDateMessage={minDateMessage}
        inputVariant="outlined"
        TextFieldComponent={renderInput}
      />
    </MuiPickersUtilsProvider>
  );
});

export default Date;
