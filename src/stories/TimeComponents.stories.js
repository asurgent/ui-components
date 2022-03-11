/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';
import * as TimeComponents from '../TimeComponents';

/* story variables */
const durationInSeconds = 3600;
const currentHour = moment().hours();
const onGoingFrom = moment()
  .set({
    hour: currentHour, minute: 0, second: 0, millisecond: 0,
  }).toISOString();

const serviceWindow = {
  reason: 'my service window',
  entity_ids: [
    'entity_id',
  ],
  entity_names: [
    'entity_name',
  ],
  enabled: true,
  ticket_id_external: null,
  modified: '2021-12-16T09:20:14.605Z',
  requested_by: 'mail@mail.com',
  start: '2021-12-16T09:19:09.322Z',
  end: '9999-12-30T22:39:59Z',
  cron_expression: '19 9 * * 4',
  cron_expression_description: 'At 09:19, only on Thursday',
  duration_in_seconds: 1800,
  dyn_is_passed: false,
  dyn_next_execution: moment(onGoingFrom)
    .add(1, 'days')
    .toISOString(),
  dyn_is_ongoing_now: false,
  dyn_is_ongoing_from: moment()
    .set({
      hour: currentHour, minute: 0, second: 0, millisecond: 0,
    }).toISOString(),
  dyn_is_ongoing_to: moment(onGoingFrom)
    .add(durationInSeconds, 'seconds')
    .toISOString(),
  dyn_cron_category: 'custom',
  temp_ticket_id: 'temp_ticket_id',
  id: 'sw_id',
  customer_id: '1168',
  customer_name: 'Asurgent AB',
  customer_display_name: 'Asurgent AB (1168)',
};
/* story variables */

const Story = {
  title: 'Components/TimeComponents',
  component: TimeComponents,
  argTypes: {},
};
export default Story;

const DateSpanTemplate = (args) => {
  const sw = {
    ...args,
    serviceWindow: {
      ...args.serviceWindow,
      dyn_is_passed: args.dyn_is_passed,
    },
  };
  return <TimeComponents.DateSpan {...sw} />;
};

export const DateSpan = DateSpanTemplate.bind({});
DateSpan.args = {
  serviceWindow,
  dyn_is_passed: false,
};

const RepeatTemplate = (args) => <TimeComponents.Repeat {...args} />;

export const Repeat = RepeatTemplate.bind({});
Repeat.args = {
  serviceWindow,
  useAnimation: true,
  showPercentage: true,
};

const StartEndTemplate = (args) => {
  Object.assign(args.serviceWindow, { dyn_is_ongoing_now: args.isOngoing });
  return <TimeComponents.StartEnd {...args} />;
};

export const StartEnd = StartEndTemplate.bind({});
StartEnd.args = {
  isOngoing: false,
  serviceWindow,
};
