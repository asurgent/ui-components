import addTranslation from '../translations/addTranslation';

export default addTranslation({
  id: 'CronEditor',
  sv: {
    startDate: 'Startdatum',
    startTime: 'Starttid',
    endDate: 'Slutdatum',

    days: 'Dagar',
    hours: 'Timmar',
    minutes: 'Minuter',

    duration: 'Längd på servicefönster',

    end: 'Upphör',
    repeat: 'Upprepa',

    expression: 'Cron Expression (UTC)',
    next: 'Kommande',
    invalid: 'Felaktigt format',

    day: 'Varje dag',
    week: 'Varje vecka',
    month: 'Varje månad',
    custom: 'Skräddarsy',

    never: 'Aldrig',
    date: 'Vid datum',
    once: 'Efter en gång',

    noteUtc: 'Notera att repeterade servicefönster använder sig av CRON-uttrycket ovan som är i UTC.',
  },
  en: {
    startDate: 'Start date',
    startTime: 'Start time',
    endDate: 'End date',

    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',

    duration: 'Duration of service window',

    end: 'End',
    repeat: 'Repeat',

    expression: 'Cron Expression (UTC)',
    next: 'Upcoming',
    invalid: 'Invalid format',

    day: 'Every day',
    week: 'Every week',
    month: 'Every month',
    custom: 'Custom',

    never: 'Never',
    date: 'On date',
    once: 'After one time',

    noteUtc: 'Note that repeating service windows will be executed using the CRON-expression above which is in UTC.',
  },
});
