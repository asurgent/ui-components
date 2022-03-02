import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from '@chakra-ui/react';
import MomentDuration from './MomentDuration';
import * as m from './momentParsers';

const propTypes = {
  timestamp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  format: PropTypes.string,
};

const defaultProps = {
  timestamp: '',
  format: '',
};

const Component = (timeFormat) => {
  const Comp = ({ timestamp, format = '' }) => {
    if (m.isValid(timestamp)) {
      return (
        <Tooltip hasArrow label={m.full(timestamp)}>
          <span className="timestamp">
            {timeFormat(timestamp, format)}
          </span>
        </Tooltip>
      );
    }
    return timeFormat;
  };
  Comp.propTypes = propTypes;
  Comp.defaultProps = defaultProps;
  return Comp;
};

const DateTime = Component(m.dateTime);
const DateComp = Component(m.date);
const Full = Component(m.full);
const Ago = Component(m.ago);
const Custom = Component(m.custom);

export {
  DateTime,
  DateComp as Date,
  Full,
  Ago,
  Custom,
  MomentDuration as Duration,
};
