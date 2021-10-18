/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Box, Button, Flex, Heading, Text,
} from '@chakra-ui/react';
import {
  FormProvider,
  Field,
  TextInput,
  TextAreaInput,
  NumberInput,
  SwitchInput,
  EmailInput,
  RadioGroupInput,
  DateInput,
  RepeatGroup,
  RepeatInput,
  RepeatAddRow,
  RepeatHeader,
  RepeatEmptyState,
} from '../Form';

const Story = {
  title: 'Components/Form',
  component: FormProvider,
  argTypes: {},
};

export default Story;

const Template = () => (
  <Box width="25rem" height="25rem" m={5} borderRadius="5px" border>
    <FormProvider
      validateOnChange
      formatter={(values) => ({ ...values })}
      validators={{
        number: ({ value }) => {
          console.log('value', value);
          return ({ isInvalid: !value || value > 0, error: 'Cant be empty' });
        },
      }}
      // initialErrors={{ field: 'Your WRONG', repeat: [{ hello: 'BU' }] }}
      initialValues={{ repeat: [{ hello: '1' }, { hello: '3' }], radioGroup: '1' }}
      onFieldError={(a) => console.log('onError', a)}
      onFieldValid={(a) => console.log('onValid', a)}
      onChange={(a, _state) => console.log('onChange', a)}
      onReset={(a) => console.log('onReset', a)}
      onSubmit={(a) => new Promise((resolve) => {
        setTimeout(() => {
          console.log('onSubmit', a);
          resolve(a);
        }, 1000);
      })}
    >
      {({ state }) => (
        <>
          <Flex flexDirection="column">
            <Box mb={4}>
              <Field
                name="field"
                validator={({ value }) => ({ isInvalid: !value, error: 'Cant be empty' })}
              >
                {(field, { errors }) => (
                  <>
                    <input {...field} type="text" style={{ border: '1px solid black' }} />
                    { errors[field.name]?.error && (
                    <Box bg="red" p="5px">
                      {errors[field.name].error}
                    </Box>
                    )}
                  </>
                )}
              </Field>
            </Box>

            <TextInput
              name="hellothere"
              label="Text input"
              helperText="we are careful"
              validator={({ value }) => ({
                isInvalid: (value || '').length === 0,
                error: 'Cant be empty',
              })}
            />

            <RepeatInput
              name="repeat"
              min={4}
              max={6}
            >
              <RepeatHeader>
                <Heading size="md" mb={1}>Group config</Heading>
                <Text fontSize="small">
                  This section you will add multipple configuration object that will bla bla bla bla
                </Text>
              </RepeatHeader>
              <RepeatEmptyState>
                <Heading size="sm" mb={1}>Well, well, well...</Heading>
                <Text>
                  You havent added any new repat rows yet,
                  please klick the plus sign above to append a row.
                  Please do or everything will explode, somewhere.
                </Text>
              </RepeatEmptyState>
              <RepeatGroup>
                <TextInput
                  name="property-1"
                  label="Configuration"
                  validator={({ value }) => ({
                    isInvalid: (value || '')
                      .length === 0,
                    error: 'Cant be empty',
                  })}
                />
              </RepeatGroup>
            </RepeatInput>

            <TextInput
              label="Text input"
              helperText="we are careful"
              name="field"
            />

            <TextAreaInput
              label="Textarea input"
              helperText="we are careful"
              name="field"
            />

            <NumberInput
              label="Number input"
              helperText="we are careful"
              name="number"
            />

            <SwitchInput
              label="Switch input"
              helperText="we are careful"
              name="switch"
            />

            <EmailInput
              label="Email input"
              helperText="we are careful"
              name="Email"
            />

            <DateInput
              dateTime
              label="Date input"
              helperText="we are careful"
              name="Date"
            />

            <RadioGroupInput
              label="Radio input"
              helperText="we are careful"
              name="radioGroup"
              options={[
                { value: '1', label: 'Im number #1' },
                { value: '2', label: 'Im number #2' },
              ]}
            />

          </Flex>

          <Flex justifyContent="space-between">
            <Button type="submit" colorScheme="green" isLoading={state.isSubmitting}>
              submit
            </Button>
            <Button type="reset" colorScheme="red">
              reset
            </Button>
          </Flex>
        </>
      )}
    </FormProvider>
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {};
