import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from '@chakra-ui/react';
import * as m from './momentParsers';
import translation from './Moment.translation';

const { t } = translation;

const propTypes = {
  start: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
    PropTypes.bool,
  ]),
  end: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
    PropTypes.bool,
  ]),
  seconds: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
};

const defaultProps = {
  seconds: false,
  start: false,
  end: false,
};

const getDuration = (start, end, duration) => {
  if (m.isValid(start) && m.isValid(end)) {
    const startDate = moment(start);
    const endDate = moment(end);

    const diff = endDate.diff(startDate);

    return moment.duration(diff);
  } if (duration && parseInt(duration, 10)) {
    return moment.duration({ seconds: parseInt(duration, 10) });
  }

  return false;
};

const generateNumbers = (duration) => ({
  month: duration.get('month'),
  days: duration.get('days'),
  hours: duration.get('hours'),
  minutes: duration.get('minutes'),
  seconds: duration.get('seconds'),
  any: duration.as('seconds'),
  tooltip: duration.as('seconds'),
});

const DurationComponent = ({ start, end, seconds: durationInSeconds }) => {
  const duration = getDuration(start, end, durationInSeconds);

  if (duration) {
    const d = generateNumbers(duration);
    return (
      <Tooltip hasArrow label={`${d.tooltip} seconds`}>
        <span className="timestamp">
          {d.any === 0 && t('none', 'ui')}
          {d.month > 0 && `${d.month} ${t('month', 'ui')} `}
          {d.days > 0 && `${d.days} ${t('days', 'ui')} `}
          {d.hours > 0 && `${d.hours} ${t('hours', 'ui')} `}
          {d.minutes > 0 && `${d.minutes} ${t('minutes', 'ui')} `}
          {d.seconds > 0 && `${d.seconds} ${t('seconds', 'ui')}`}
        </span>
      </Tooltip>
    );
  }

  return null;
};

DurationComponent.defaultProps = defaultProps;
DurationComponent.propTypes = propTypes;

export default DurationComponent;
