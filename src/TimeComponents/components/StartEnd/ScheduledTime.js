import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';
import { Tooltip, useTheme } from '@chakra-ui/react';
import translation from './StartEnd.translation';
import * as C from '../../TimeComponents.styled';

const { t } = translation;

const propTypes = {
  timestamp: PropTypes.string.isRequired,
};

const ScheduledTime = ({ timestamp }) => {
  const { colors } = useTheme();
  return (
    <C.Time colors={colors}>
      <Tooltip hasArrow label={`${t('utcTime', 'ui')} ${moment.utc(timestamp).format('HH:mm')}`}>
        <C.FlexCol>
          <C.TextSmall>
            {`${t(`day${moment(timestamp).day()}`, 'ui')} ${moment(timestamp).format('HH:mm')}`}
          </C.TextSmall>
          <MdiIcon size={0.5} path={mdiInformationOutline} color={colors?.blue?.['900']} />
        </C.FlexCol>
      </Tooltip>
    </C.Time>
  );
};

ScheduledTime.propTypes = propTypes;

export default ScheduledTime;
