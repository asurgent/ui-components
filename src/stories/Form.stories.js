/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import * as FormComponents from '../Form';

const Story = {
  title: 'Components/Form',
  component: FormComponents,
  argTypes: {},
};

export default Story;

const FormTemplate = () => (
  <Box width="25rem" height="25rem" m={5} borderRadius="5px" border>
    <FormComponents.FormProvider
      formatter={(values) => ({
        one: values.field,
        two: values['field-2'],
        tree: values['field-3'],
      })}
      validators={{ field: (val) => ({ fail: val.length === 0, error: 'Cant be empty' }) }}
      initialErrors={{ field: 'Your WRONG' }}
      initialValues={{ field: 'Gurkansson', 'field-3': 'I will appear like magic' }}
      onChange={(a) => console.log('onChange', a)}
      onReset={(a) => console.log('onReset', a)}
      onSubmit={(a) => new Promise((resolve) => {
        setTimeout(() => {
          resolve(a);
        }, 1000);
      })}
    >
      {({ state }) => (
        <>
          <Flex flexDirection="column">

            <FormComponents.Field name="field" validator={(val) => ({ fail: val.length === 0, error: 'Cant be empty' })}>
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
            </FormComponents.Field>

            <FormComponents.Field name="field-2">
              {(field) => (
                <input {...field} type="text" style={{ border: '1px solid black' }} />
              )}
            </FormComponents.Field>

            { !state.errors.field && (
              <FormComponents.Field name="field-3">
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
              </FormComponents.Field>
            )}

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
    </FormComponents.FormProvider>
  </Box>
);

export const Form = FormTemplate.bind({});
Form.args = {
  rowHeight: 60,
  numberOfEntries: 100,
};
