import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTheme } from '@chakra-ui/react';
import * as Moment from '../../Moment';
import * as C from '../CronEditor.styled';
import translation from '../CronEditor.translation';
import { getNextExecutionList, validateToString } from '../helpers';

const { t } = translation;

const propTypes = {
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  cronExpression: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  withBorder: PropTypes.bool,
};

const defaultProps = {
  withBorder: false,
};

const RepeatOutput = ({
  cronExpression, startDate, withBorder,
}) => {
  const { colors } = useTheme();
  return (
    <C.Output withBorder={withBorder} colors={colors}>
      <C.Label style={{ flexDirection: 'column' }}>
        { validateToString(cronExpression) && (
        <>
          <C.Title>{t('next', 'ui')}</C.Title>
          {
            getNextExecutionList(cronExpression, startDate)
              .map((e) => (<Moment.DateTime timestamp={e} key={e} />))
          }
        </>
        )}
      </C.Label>
    </C.Output>
  );
};

RepeatOutput.propTypes = propTypes;
RepeatOutput.defaultProps = defaultProps;

export default RepeatOutput;
