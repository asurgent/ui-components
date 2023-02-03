import cronstrue from 'cronstrue';
import Cron from 'cron-converter';
import moment from 'moment';
import {
  REPEAT_DAY, REPEAT_WEEK, REPEAT_MONTH, REPEAT_CUSTOM,
} from './constants';

export const getNextExecutionList = (expression, startDate) => {
  try {
    const cronInstance = new Cron();
    cronInstance.fromString(expression);
    const interval = cronInstance.schedule(moment.utc(startDate));

    return Array.from({ length: 3 }, () => {
      try {
        return interval.next().format();
      } catch (e) {
        return null;
      }
    });
  } catch (e) {
    return [];
  }
};

export const validateToString = (expression) => {
  try {
    return cronstrue.toString(expression, { use24HourTimeFormat: true });
  } catch (e) {
    return false;
  }
};

export const getRepeatType = (cronExpression) => {
  const [minute, hour, dayOfMonth, month, dayOfWeek] = cronExpression.split(' ');

  if (
    !cronExpression
    || (minute !== '*'
     && hour !== '*'
      && dayOfMonth === '*'
      && month === '*'
      && dayOfWeek === '*')) {
    return REPEAT_DAY;
  } if (minute !== '*'
     && hour !== '*'
     && dayOfMonth === '*'
     && month === '*'
     && dayOfWeek !== '*') {
    return REPEAT_WEEK;
  } if (
    minute !== '*'
    && hour !== '*'
    && dayOfMonth !== '*'
     && month === '*'
     && dayOfWeek === '*') {
    return REPEAT_MONTH;
  }
  return REPEAT_CUSTOM;
};
