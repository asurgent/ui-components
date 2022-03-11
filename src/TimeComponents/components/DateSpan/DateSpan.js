import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MdiIcon from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';
import { Tooltip, useTheme } from '@chakra-ui/react';
import * as C from '../../TimeComponents.styled';
import translation from './DateSpan.translation';

const { t } = translation;

const Datespan = ({ serviceWindow }) => {
  const { start, end, dyn_is_passed: hasExpired } = serviceWindow;

  const { colors } = useTheme();
  return (
    <C.Dates>
      <C.Container colors={colors} hasExpired={hasExpired} marginRight>
        <C.StartDate hasExpired={hasExpired} colors={colors}>
          <C.TextNormal>{moment(start).format('D')}</C.TextNormal>
          <C.TextSmall>
            {`${t(`month${moment(start).month()}`, 'ui')} ${moment(start).format('YYYY')}`}
          </C.TextSmall>
        </C.StartDate>

        <C.Time colors={colors}>
          <Tooltip hasArrow label={`${t('utcTime', 'ui')} ${moment.utc(start).format('HH:mm')}`}>
            <C.FlexCol>
              <C.TextSmall>
                {`${t(`day${moment(start).day()}`, 'ui')} ${moment(start).format('HH:mm')}`}
              </C.TextSmall>
              <MdiIcon size={0.5} path={mdiInformationOutline} color={colors?.blue?.['900']} />
            </C.FlexCol>
          </Tooltip>
        </C.Time>

      </C.Container>

      <C.Container colors={colors} hasExpired={hasExpired} marginLeft>
        <C.EndDate hasExpired={hasExpired} colors={colors}>
          <C.TextNormal>{moment(end).format('D')}</C.TextNormal>
          <C.TextSmall>
            {`${t(`month${moment(end).month()}`, 'ui')} ${moment(end).format('YYYY')}`}
          </C.TextSmall>
        </C.EndDate>

        <C.Time colors={colors}>
          <Tooltip hasArrow label={`${t('utcTime', 'ui')} ${moment.utc(end).format('HH:mm')}`}>
            <C.FlexCol>
              <C.TextSmall>
                {`${t(`day${moment(end).day()}`, 'ui')} ${moment(end).format('HH:mm')}`}
              </C.TextSmall>
              <MdiIcon size={0.5} path={mdiInformationOutline} color={colors?.blue?.['900']} />
            </C.FlexCol>
          </Tooltip>
        </C.Time>

      </C.Container>

    </C.Dates>
  );
};

Datespan.propTypes = {
  serviceWindow: PropTypes.instanceOf(Object),
};
Datespan.defaultProps = {
  serviceWindow: {},
};

export default Datespan;
