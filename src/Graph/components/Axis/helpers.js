import * as d3 from 'd3';

const locales = (t) => ({
  dateTime: '%a %b %e %X %Y',
  date: '%d.%m.%Y',
  time: '%HH:%M:%S',
  periods: [],
  days: [
    t('sunday', 'ui'),
    t('monday', 'ui'),
    t('tuesday', 'ui'),
    t('wednesday', 'ui'),
    t('thursday', 'ui'),
    t('friday', 'ui'),
    t('saturday', 'ui'),
  ],
  shortDays: [
    t('sun', 'ui'),
    t('mon', 'ui'),
    t('tue', 'ui'),
    t('wed', 'ui'),
    t('thu', 'ui'),
    t('fri', 'ui'),
    t('sat', 'ui'),
  ],
  months:
  [
    t('januany', 'ui'),
    t('feburary', 'ui'),
    t('march', 'ui'),
    t('april', 'ui'),
    t('may', 'ui'),
    t('june', 'ui'),
    t('july', 'ui'),
    t('august', 'ui'),
    t('september', 'ui'),
    t('october', 'ui'),
    t('november', 'ui'),
    t('december', 'ui'),
  ],
  shortMonths:
  [
    t('jan', 'ui'),
    t('feb', 'ui'),
    t('mar', 'ui'),
    t('apr', 'ui'),
    t('may', 'ui'),
    t('jun', 'ui'),
    t('jul', 'ui'),
    t('aug', 'ui'),
    t('sep', 'ui'),
    t('oct', 'ui'),
    t('nov', 'ui'),
    t('dec', 'ui'),
  ],
});
export const customTick = (translator) => {
  const formatter = d3.timeFormatLocale(locales(translator));

  const formatHour = formatter.format('%H:%M %p');
  const formatDay = formatter.format('%a %d');
  const formatWeek = formatter.format('%b %d');
  const formatMonth = formatter.format('%B');
  const formatYear = formatter.format('%Y');

  return (date) => {
    if (d3.timeDay(date) < date) {
      return formatHour(date);
    } if (d3.timeMonth(date) < date) {
      if (d3.timeWeek(date) < date) {
        return formatDay(date);
      }
      return formatWeek(date);
    } if (d3.timeYear(date) < date) {
      return formatMonth(date);
    }
    return formatYear(date);
  };
};
