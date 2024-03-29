import React from 'react';
import moment from 'moment';
import MdiIcon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiStop, mdiPlay, mdiInformationOutline } from '@mdi/js';
import { Tooltip, useTheme } from '@chakra-ui/react';
import translation from './StartEnd.translation';
import * as C from '../../TimeComponents.styled';

const { t } = translation;

const propTypes = {
  timestamp: PropTypes.string.isRequired,
  hasExpired: PropTypes.bool.isRequired,
  isEndTime: PropTypes.bool,
};

const OngoingDateTime = ({ timestamp, hasExpired, isEndTime }) => {
  const { colors } = useTheme();
  const labelKey = isEndTime ? 'ends' : 'started';

  return (
    <Tooltip hasArrow label={`${t('utcTime', 'ui')} ${moment.utc(timestamp).format('HH:mm')}`}>
      <C.Container colors={colors} marginRight>

        <C.TextSmall withBottomMargin>{t(labelKey, 'ui')}</C.TextSmall>
        <MdiIcon style={{ display: 'initial' }} size={0.875} path={hasExpired ? mdiStop : mdiPlay} color={colors?.blue?.['900']} />

        <C.FlexCol>
          <C.TextNormal>
            {moment(timestamp).format('HH:mm')}
          </C.TextNormal>
          <MdiIcon style={{ marginLeft: '0.2rem' }} size={0.5} path={mdiInformationOutline} color={colors?.blue?.['900']} />
        </C.FlexCol>

        <C.TextSmall withBottomMargin>{moment(timestamp).format('YYYY-MM-DD')}</C.TextSmall>

      </C.Container>
    </Tooltip>
  );
};

OngoingDateTime.propTypes = propTypes;

OngoingDateTime.defaultProps = {
  isEndTime: false,
};

export default OngoingDateTime;
