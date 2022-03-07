import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiAndroidMessages } from '@mdi/js';
import { useTheme } from '@chakra-ui/react';
import * as C from './Status.styled';

const getColor = (status, colors) => {
  switch (status) {
    case 'pending':
      return '#fcb21e';
    case 'open':
      return colors?.green?.['700'];
    case 'closed':
      return colors?.ruby?.['800'];
    case 'on hold':
      return '#f97b1b';
    case 'executing':
      return '#e86a7d';
    case 'resolved':
      return '#6d63ce';
    default:
      return colors?.gray?.['800'];
  }
};

const Status = ({ status, scale, useIcon }) => {
  const { colors } = useTheme();

  const color = getColor(status, colors);
  const bg = colors?.gray?.['50'];

  return (
    <C.Status color={color} bg={bg} scale={scale}>
      {useIcon && <MdiIcon path={mdiAndroidMessages} size={scale * 0.64} />}
      {status}
    </C.Status>
  );
};

Status.propTypes = {
  status: PropTypes.oneOf([
    'pending',
    'open',
    'closed',
    'on hold',
    'executing',
    'resolved',
  ]),
  scale: PropTypes.number,
  useIcon: PropTypes.bool,
};

Status.defaultProps = {
  status: '',
  scale: 1,
  useIcon: true,
};

export default Status;
