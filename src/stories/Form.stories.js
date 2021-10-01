/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import {
  FormProvider,
  Field,
  Text,
  TextArea,
  Number,
  Switch,
  Email,
  RadioGroup,
  Date,
  RepeatGroup,
  RepeatPattern,
  RepeatAddRow,
} from '../Form';

const Story = {
  title: 'Components/Form',
  component: FormProvider,
  argTypes: {},
};
//
export default Story;

const Template = () => (
  <Box width="25rem" height="25rem" m={5} borderRadius="5px" border>
    <FormProvider
      validateOnChange
      formatter={(values) => ({
        ...values,
        // one: values.field,
        // two: values['field-2'],
        // tree: values['field-3'],
      })}
      validators={{ number: (val) => ({ isValid: val.length > 0, error: 'Cant be empty' }) }}
      initialErrors={{ field: 'Your WRONG', repeat: [{ hello: 'BU' }] }}
      initialValues={{ repeat: [{ hello: '1' }, { hello: '3' }] }}
      onChange={(a) => console.log('onChange', a)}
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
            {/* <Box mb={4}>
              <Field
                name="field"
                validator={(val) => ({ isValid: val.length === 0, error: 'Cant be empty' })}
              >
                {(field, { errors }) => (
                  <>
                    <input {...field} type="text" style={{ border: '1px solid black' }} />
                    { errors[field.name] && (
                    <Box bg="red" p="5px">
                      {errors[field.name]}
                    </Box>
                    )}
                  </>
                )}
              </Field>
            </Box> */}

            {/* <Text
              name="hellothere"
              label="Provide name"
              helperText="we are careful"
              validator={({ value }) =>
              ({ isValid: (value || '').length > 0, error: 'Cant be empty' })}
            /> */}

            <RepeatGroup
              toArray
              name="repeat"
              // min={4}
              // max={3}
              // formatter={(values) => ({ 'im-a-wrapper': values })}
            >
              <RepeatPattern>
                <Text
                  name="hello"
                  label="Provide name"
                  helperText="we are careful"
                  validator={(a) => {
                    const { value } = a;
                    return ({ isValid: (value || '').length > 0, error: 'Cant be empty' });
                  }}
                />
              </RepeatPattern>
              <RepeatAddRow colorScheme="pink" mb={5}>
                Add new row
              </RepeatAddRow>
            </RepeatGroup>

            {/*
            <Text
              label="Provide name"
              isRequired
              helperText="we are careful"
              name="field"
              validator={(val) => ({ isValid: val.length > 0, error: 'Cant be empty' })}
            />

            <TextArea
              label="Provide name"
              isRequired
              helperText="we are careful"
              name="field"
              validator={(val) => ({ isValid: val.length > 0, error: 'Cant be empty' })}
            />

            <Number
              label="Provide name"
              isRequired
              helperText="we are careful"
              name="number"
            />

            <Switch
              label="Provide name"
              helperText="we are careful"
              name="switch"
            />

            <Email
              label="Provide name"
              isRequired
              helperText="we are careful"
              name="Email"
            />

            <Date
              label="Provide name"
              isRequired
              helperText="we are careful"
              name="Date"
            />

            <RadioGroup
              label="Provide name"
              isRequired
              helperText="we are careful"
              name="RadioGroup"
              options={[
                { value: 1, label: 'Im number #1' },
                { value: 2, label: 'Im number #2' },
              ]}
            /> */}

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
