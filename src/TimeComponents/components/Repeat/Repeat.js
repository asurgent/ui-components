import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/react';
import translation from './Repeat.translation';
import * as C from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { getProgress } from './helpers';
import * as Progress from '../../../Progress';

const { t } = translation;

const Repeat = ({
  serviceWindow,
  useAnimation,
  showPercentage,
}) => {
  const {
    dyn_is_passed: hasExpired,
    dyn_is_ongoing_now: isOngoing,
    dyn_is_ongoing_from: onGoingFrom,
    dyn_is_ongoing_to: onGoingTo,
    dyn_cron_category: cronCategory,
  } = serviceWindow;

  const { colors } = useTheme();

  if (hasExpired) {
    return (
      <C.Container colors={colors} hasExpired data-testid="expired">
        <C.TextSmall style={{ marginBottom: '0.6875rem' }}>{t('status', 'asurgentui')}</C.TextSmall>
        <C.TextNormal data-testid="short-label">{t('naIcon', 'asurgentui')}</C.TextNormal>
        <C.TextSmall style={{ marginTop: '0.6875rem' }} data-testid="long-label">{t('expired', 'asurgentui')}</C.TextSmall>
      </C.Container>
    );
  }

  if (isOngoing) {
    return (
      <C.Container colors={colors} data-testid="progress">
        <C.TextSmall style={{ marginBottom: '0.3125rem' }}>{t('status', 'asurgentui')}</C.TextSmall>
        <Progress.Ring
          radius={20}
          stroke={2}
          progress={getProgress(onGoingFrom, onGoingTo)}
          useShadow
          useAnimation={useAnimation}
          showPercentage={showPercentage}
        />
        <C.TextSmall withBottomMargin>{t('ongoing', 'asurgentui')}</C.TextSmall>
      </C.Container>
    );
  }

  if (cronCategory) {
    return (
      <C.Container colors={colors} data-testid="repeats">
        <C.TextSmall withBottomMargin>{t('repeats', 'asurgentui')}</C.TextSmall>
        <Icons.Dots color={hasExpired ? colors?.gray?.['600'] : colors?.blue?.['900']} />
        <C.TextNormal data-testid={cronCategory}>{t(`${cronCategory}Short`, 'asurgentui')}</C.TextNormal>
        <C.TextSmall>{t(`${cronCategory}Long`, 'asurgentui')}</C.TextSmall>
      </C.Container>
    );
  }
  return (
    <C.Container colors={colors} data-testid="occursOnce">
      <C.TextSmall withBottomMargin>{t('occurs', 'asurgentui')}</C.TextSmall>
      <Icons.Dots color={hasExpired ? colors?.gray?.['600'] : colors?.blue?.['900']} />
      <C.TextNormal>1</C.TextNormal>
      <C.TextSmall>{t('time', 'asurgentui')}</C.TextSmall>
    </C.Container>
  );
};

Repeat.propTypes = {
  serviceWindow: PropTypes.instanceOf(Object),
  useAnimation: PropTypes.bool,
  showPercentage: PropTypes.bool,
};

Repeat.defaultProps = {
  serviceWindow: null,
  useAnimation: false,
  showPercentage: false,
};

export default Repeat;
