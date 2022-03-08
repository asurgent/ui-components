import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as C from '../CronEditor.styled';
import translation from '../CronEditor.translation';

const { t } = translation;

const propTypes = {
  hook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const CronEditor = ({ hook }) => (

  <MuiPickersUtilsProvider utils={MomentUtils}>
    <C.Row>
      <KeyboardDatePicker
        label={t('startDate', 'ui')}
        format="DD-MM-YYYY"
        value={hook.getStartDate()}
        onChange={hook.handleStartDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />

      <KeyboardTimePicker
        ampm={false}
        minutesStep={5}
        label={t('startTime', 'ui')}
        value={hook.getStartDate()}
        onChange={hook.handleStartDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </C.Row>
  </MuiPickersUtilsProvider>

);

CronEditor.propTypes = propTypes;
CronEditor.defaultProps = defaultProps;

export default CronEditor;
