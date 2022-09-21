import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTheme } from '@chakra-ui/react';
import * as C from '../../TimeComponents.styled';
import { getLastRun } from './helpers';
import Duration from './Duration';
import ScheduledTime from './ScheduledTime';
import ScheduledDate from './ScheduledDate';
import OngoingDateTime from './OngoingDateTime';

const StartEnd = ({ serviceWindow }) => {
  const {
    start,
    end,
    dyn_next_execution: nextExecution,
    duration_in_seconds: durationInSeconds,
    dyn_is_passed: hasExpired,
    dyn_is_ongoing_now: isOnGoing,
    dyn_is_ongoing_from: onGoingFrom,
    dyn_is_ongoing_to: onGoingTo,
    dyn_cron_category: cronExpression,
  } = serviceWindow;

  const { colors } = useTheme();

  const dates = useMemo(() => {
    if (!cronExpression) {
      return {
        from: moment(start),
        to: moment(end),
      };
    }

    if (isOnGoing) {
      return {
        from: moment(onGoingFrom),
        to: moment(onGoingTo),
      };
    }

    // has next execution-date from the api
    if (nextExecution) {
      return {
        from: moment(nextExecution),
        to: moment(nextExecution).add(durationInSeconds, 'seconds'),
      };
    }

    // expired but repeated, find the last occurrence and add duration
    return getLastRun({ cronExpression, end, durationInSeconds });
  }, [cronExpression,
    durationInSeconds,
    start,
    end,
    isOnGoing,
    nextExecution,
    onGoingFrom,
    onGoingTo,
  ]);

  const duration = isOnGoing
    ? moment.duration(dates.to.diff(moment())).asSeconds()
    : durationInSeconds;
  // play/stop buttons
  if (isOnGoing) {
    return (
      <C.Dates>

        <OngoingDateTime timestamp={moment(dates.from).toISOString()} hasExpired={hasExpired} />

        <Duration
          duration={duration}
          serviceWindow={serviceWindow}
        />

        <OngoingDateTime
          isEndTime
          timestamp={moment(dates.to).toISOString()}
          hasExpired={hasExpired}
        />

      </C.Dates>
    );
  }

  // calendar versions
  return (
    <C.Dates>

      <C.Container colors={colors} hasExpired={hasExpired} marginRight>
        <ScheduledDate hasExpired={hasExpired} timestamp={moment(dates.from).toISOString()} />
        <ScheduledTime timestamp={moment(dates.from).toISOString()} />
      </C.Container>

      <Duration
        duration={duration}
        serviceWindow={serviceWindow}
      />

      <C.Container colors={colors} hasExpired={hasExpired} marginLeft>
        <ScheduledDate hasExpired={hasExpired} timestamp={moment(dates.to).toISOString()} />
        <ScheduledTime timestamp={moment(dates.to).toISOString()} />
      </C.Container>

    </C.Dates>
  );
};

StartEnd.propTypes = {
  serviceWindow: PropTypes.instanceOf(Object),
};

StartEnd.defaultProps = {
  serviceWindow: null,
};

export default StartEnd;
