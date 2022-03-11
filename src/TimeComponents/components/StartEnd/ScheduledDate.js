import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/react';
import translation from './StartEnd.translation';
import * as C from '../../TimeComponents.styled';

const { t } = translation;

const ScheduledDate = ({ timestamp, hasExpired }) => {
  const { colors } = useTheme();
  return (
    <C.DateAndTime colors={colors} active={!hasExpired}>
      <C.TextNormal>{moment(timestamp).format('D')}</C.TextNormal>
      <C.TextSmall>
        {`${t(`month${moment(timestamp).month()}`, 'asurgentui')} ${moment(timestamp).format('YYYY')}`}
      </C.TextSmall>
    </C.DateAndTime>
  );
};
ScheduledDate.propTypes = {
  timestamp: PropTypes.string.isRequired,
  hasExpired: PropTypes.bool.isRequired,
};

export default ScheduledDate;
