import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, useTheme } from '@chakra-ui/react';
import { formatTextNumber } from './helpers';
import * as C from '../../TimeComponents.styled';
import translation from './StartEnd.translation';
import * as Icons from '../Icons';

const { t } = translation;

const propTypes = {
  serviceWindow: PropTypes.instanceOf(Object),
  duration: PropTypes.number,
};
const defaultProps = {
  serviceWindow: null,
  duration: 0,
};

const Duration = ({ serviceWindow, duration }) => {
  const {
    dyn_is_passed: hasExpired,
    dyn_is_ongoing_now: isOnGoing,
  } = serviceWindow;

  const { colors } = useTheme();

  const text = useMemo(() => {
    if (isOnGoing) {
      return t('remaining', 'ui');
    }
    return hasExpired ? t('lasted', 'ui') : t('duration', 'ui');
  }, [hasExpired, isOnGoing]);

  return (
    <Tooltip hasArrow label={`${duration} ${t('seconds', 'ui')}`}>
      <C.Container colors={colors} hasExpired={hasExpired} marginRight marginLeft>
        <C.TextSmall withBottomMargin>{text}</C.TextSmall>
        <Icons.Duration active={!hasExpired} color={colors?.blue?.['900']} />
        <C.TextNormal>{formatTextNumber(duration)[0]}</C.TextNormal>
        <C.TextSmall withBottomMargin>
          {formatTextNumber(duration)[1]}
        </C.TextSmall>
      </C.Container>
    </Tooltip>
  );
};

Duration.propTypes = propTypes;
Duration.defaultProps = defaultProps;

export default Duration;
